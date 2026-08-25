import { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const TAU = Math.PI * 2;

const wrapIndex = (index, length) => {
  if (!length) return 0;
  return ((Number(index) || 0) % length + length) % length;
};

const posterStyle = {
  position: 'absolute',
  inset: 0,
  margin: 0,
  overflow: 'hidden'
};

export default function ZoneOrbitScene({ zones = [], activeIndex = 0, onActiveChange }) {
  const mountRef = useRef(null);
  const controllerRef = useRef(null);
  const activeRef = useRef(wrapIndex(activeIndex, zones.length));
  const onActiveChangeRef = useRef(onActiveChange);
  const [webglEnabled, setWebglEnabled] = useState(false);
  const selectedIndex = wrapIndex(activeIndex, zones.length);
  const selectedZone = zones[selectedIndex];

  onActiveChangeRef.current = onActiveChange;

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const sync = () => {
      if (motion.matches) {
        setWebglEnabled(false);
        return;
      }

      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        setWebglEnabled(Boolean(gl));
        gl?.getExtension('WEBGL_lose_context')?.loseContext();
      } catch {
        setWebglEnabled(false);
      }
    };

    sync();
    motion.addEventListener('change', sync);
    return () => motion.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    const sceneZones = zones.slice(0, 4);
    if (!webglEnabled || !mount || !sceneZones.length) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
      setWebglEnabled(false);
      return undefined;
    }

    let destroyed = false;
    let animationFrame = 0;
    let selected = wrapIndex(activeRef.current, sceneZones.length);
    const step = TAU / sceneZones.length;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 40);
    const orbit = new THREE.Group();
    const totem = new THREE.Group();
    const portals = [];
    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();
    const textureLoader = new THREE.TextureLoader();
    const loadedTextures = new Set();
    const pointer = {
      id: null,
      startX: 0,
      startY: 0,
      startRotation: 0,
      dragging: false,
      startedAt: 0
    };

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;touch-action:pan-y;cursor:grab;user-select:none';
    mount.append(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x181300, 2.4));
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
    keyLight.position.set(3, 5, 6);
    scene.add(keyLight);
    const signalLight = new THREE.PointLight(0xffd400, 18, 11, 2);
    signalLight.position.set(-1.5, 1.2, 3);
    scene.add(signalLight);

    const yellowFace = new THREE.MeshStandardMaterial({
      color: 0xffd400,
      emissive: 0x5a4800,
      emissiveIntensity: 0.42,
      metalness: 0.2,
      roughness: 0.35
    });
    const darkSide = new THREE.MeshStandardMaterial({ color: 0x090908, metalness: 0.35, roughness: 0.3 });
    const totemMaterials = [darkSide, darkSide, darkSide, darkSide, yellowFace, darkSide];

    const addTotemBar = (size, position, rotationZ = 0) => {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(...size), totemMaterials);
      bar.position.set(...position);
      bar.rotation.z = rotationZ;
      totem.add(bar);
    };

    addTotemBar([0.42, 2.55, 0.5], [0.5, 0.35, 0]);
    addTotemBar([1.55, 0.38, 0.5], [-0.05, 0.05, 0.01]);
    addTotemBar([0.38, 1.82, 0.5], [-0.27, 0.66, 0], -0.62);
    totem.position.y = 0.62;
    totem.rotation.set(-0.08, -0.18, 0);
    scene.add(totem);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.24, 0.055, 8, 72),
      new THREE.MeshBasicMaterial({ color: 0xffd400, transparent: true, opacity: 0.78 })
    );
    ring.position.y = -0.72;
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    sceneZones.forEach((zone, index) => {
      const angle = index * step;
      const portal = new THREE.Group();
      const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0xffd400,
        emissive: 0xffb800,
        emissiveIntensity: 0.12,
        metalness: 0.18,
        roughness: 0.42
      });
      const imageMaterial = new THREE.MeshBasicMaterial({
        color: 0x181815,
        transparent: true,
        opacity: 0.55
      });
      const frame = new THREE.Mesh(new THREE.BoxGeometry(2.58, 1.66, 0.14), frameMaterial);
      const image = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.48), imageMaterial);

      image.position.z = 0.076;
      image.userData.portalIndex = index;
      portal.add(frame, image);
      portal.position.set(Math.sin(angle) * 3.2, -1.03, Math.cos(angle) * 3.2);
      portal.rotation.y = angle;
      orbit.add(portal);
      portals.push({ group: portal, image, imageMaterial, frameMaterial, angle });

      if (zone.image) {
        textureLoader.load(
          zone.image,
          texture => {
            if (destroyed) {
              texture.dispose();
              return;
            }
            loadedTextures.add(texture);
            texture.colorSpace = THREE.SRGBColorSpace;
            const imageAspect = texture.image.width / texture.image.height;
            const frameAspect = 2.4 / 1.48;
            if (imageAspect > frameAspect) {
              texture.repeat.x = frameAspect / imageAspect;
              texture.offset.x = (1 - texture.repeat.x) / 2;
            } else {
              texture.repeat.y = imageAspect / frameAspect;
              texture.offset.y = (1 - texture.repeat.y) / 2;
            }
            texture.needsUpdate = true;
            imageMaterial.map = texture;
            imageMaterial.color.set(0xffffff);
            imageMaterial.needsUpdate = true;
            render();
          },
          undefined,
          () => render()
        );
      }
    });

    orbit.rotation.y = -selected * step;
    scene.add(orbit);

    function render() {
      if (destroyed) return;
      portals.forEach(portal => {
        const front = (Math.cos(portal.angle + orbit.rotation.y) + 1) / 2;
        const scale = 0.8 + front * 0.2;
        portal.group.scale.setScalar(scale);
        portal.imageMaterial.opacity = 0.28 + front * 0.72;
        portal.frameMaterial.emissiveIntensity = 0.06 + front * 0.58;
      });
      renderer.render(scene, camera);
    }

    function nearestTarget(index) {
      const base = -wrapIndex(index, sceneZones.length) * step;
      return base + Math.round((orbit.rotation.y - base) / TAU) * TAU;
    }

    function animateTo(index, notify = false) {
      const next = wrapIndex(index, sceneZones.length);
      const target = nearestTarget(next);
      const start = orbit.rotation.y;
      const distance = target - start;
      const duration = Math.min(520, 260 + Math.abs(distance) * 90);
      const startedAt = performance.now();

      selected = next;
      activeRef.current = next;
      cancelAnimationFrame(animationFrame);
      if (notify) onActiveChangeRef.current?.(next);

      if (Math.abs(distance) < 0.0005) {
        orbit.rotation.y = target;
        render();
        return;
      }

      const tick = now => {
        const progress = Math.min(1, (now - startedAt) / duration);
        const eased = 1 - Math.pow(1 - progress, 4);
        orbit.rotation.y = start + distance * eased;
        render();
        if (progress < 1 && !destroyed) animationFrame = requestAnimationFrame(tick);
        else animationFrame = 0;
      };
      animationFrame = requestAnimationFrame(tick);
    }

    function selectNearest() {
      const rawIndex = Math.round(-orbit.rotation.y / step);
      animateTo(wrapIndex(rawIndex, sceneZones.length), true);
    }

    function hitPortal(clientX, clientY) {
      const rect = renderer.domElement.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      pointerNdc.set(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1
      );
      scene.updateMatrixWorld(true);
      raycaster.setFromCamera(pointerNdc, camera);
      return raycaster.intersectObjects(portals.map(portal => portal.image), false)[0]?.object.userData.portalIndex ?? null;
    }

    function onPointerDown(event) {
      if (pointer.id !== null) return;
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      pointer.id = event.pointerId;
      pointer.startX = event.clientX;
      pointer.startY = event.clientY;
      pointer.startRotation = orbit.rotation.y;
      pointer.dragging = false;
      pointer.startedAt = performance.now();
      renderer.domElement.setPointerCapture?.(event.pointerId);
      renderer.domElement.style.cursor = 'grabbing';
    }

    function onPointerMove(event) {
      const rect = renderer.domElement.getBoundingClientRect();
      const nx = rect.width ? (event.clientX - rect.left) / rect.width - 0.5 : 0;
      const ny = rect.height ? (event.clientY - rect.top) / rect.height - 0.5 : 0;

      if (pointer.id === event.pointerId) {
        const dx = event.clientX - pointer.startX;
        const dy = event.clientY - pointer.startY;
        if (!pointer.dragging && Math.abs(dx) > 9 && Math.abs(dx) > Math.abs(dy) * 1.15) pointer.dragging = true;
        if (pointer.dragging) {
          if (event.cancelable) event.preventDefault();
          orbit.rotation.y = pointer.startRotation + dx * (rect.width < 640 ? 0.008 : 0.0055);
        }
      }

      totem.rotation.x = -0.08 + ny * 0.14;
      totem.rotation.y = -0.18 + nx * 0.28;
      render();
    }

    function finishPointer(event, cancelled = false) {
      if (pointer.id !== event.pointerId) return;
      const distance = Math.hypot(event.clientX - pointer.startX, event.clientY - pointer.startY);
      const wasDragging = pointer.dragging;
      pointer.id = null;
      pointer.dragging = false;
      if (renderer.domElement.hasPointerCapture?.(event.pointerId)) {
        renderer.domElement.releasePointerCapture(event.pointerId);
      }
      renderer.domElement.style.cursor = 'grab';
      totem.rotation.set(-0.08, -0.18, 0);

      if (wasDragging) {
        selectNearest();
        return;
      }

      if (!cancelled && distance < 9 && performance.now() - pointer.startedAt < 550) {
        const hit = hitPortal(event.clientX, event.clientY);
        if (hit !== null) {
          animateTo(hit, true);
          return;
        }
      }
      render();
    }

    const onPointerUp = event => finishPointer(event, false);
    const onPointerCancel = event => finishPointer(event, true);
    const onPointerLeave = () => {
      if (pointer.id !== null) return;
      totem.rotation.set(-0.08, -0.18, 0);
      render();
    };
    const onContextLost = event => {
      event.preventDefault();
      setWebglEnabled(false);
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('pointercancel', onPointerCancel);
    renderer.domElement.addEventListener('pointerleave', onPointerLeave);
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);

    function resize() {
      const rect = mount.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const mobile = rect.width < 640;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5));
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height;
      camera.fov = mobile ? 50 : 42;
      camera.position.set(0, mobile ? 0.05 : 0, mobile ? 8.4 : 7.5);
      camera.updateProjectionMatrix();
      orbit.scale.setScalar(mobile ? 0.82 : 1);
      totem.scale.setScalar(mobile ? 0.9 : 1);
      render();
    }

    let resizeObserver;
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);
    } else {
      window.addEventListener('resize', resize);
    }

    controllerRef.current = {
      select(index, notify = false) {
        const next = wrapIndex(index, sceneZones.length);
        if (next === selected && !notify) return;
        animateTo(next, notify);
      }
    };

    resize();

    return () => {
      destroyed = true;
      controllerRef.current = null;
      cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
      if (!resizeObserver) window.removeEventListener('resize', resize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('pointercancel', onPointerCancel);
      renderer.domElement.removeEventListener('pointerleave', onPointerLeave);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);

      const geometries = new Set();
      const materials = new Set();
      scene.traverse(object => {
        if (object.geometry) geometries.add(object.geometry);
        const objectMaterials = Array.isArray(object.material) ? object.material : [object.material];
        objectMaterials.filter(Boolean).forEach(material => materials.add(material));
      });
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(material => material.dispose());
      loadedTextures.forEach(texture => texture.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [webglEnabled, zones]);

  useEffect(() => {
    activeRef.current = selectedIndex;
    controllerRef.current?.select(selectedIndex, false);
  }, [selectedIndex]);

  const changeByKeyboard = useCallback(event => {
    if (!zones.length || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? zones.length - 1
        : wrapIndex(activeRef.current + (event.key === 'ArrowRight' ? 1 : -1), zones.length);
    activeRef.current = next;
    if (controllerRef.current) controllerRef.current.select(next, true);
    else onActiveChangeRef.current?.(next);
  }, [zones.length]);

  const label = selectedZone?.label || selectedZone?.name || 'игровая зона';

  return (
    <div
      className="zone-orbit-scene"
      role="group"
      aria-label={`Интерактивная 3D-сцена игровых зон. Выбрано: ${label}`}
      tabIndex={zones.length ? 0 : -1}
      onKeyDown={changeByKeyboard}
      style={{ position: 'relative', minHeight: 'min(82svh, 820px)', overflow: 'hidden', touchAction: 'pan-y' }}
    >
      <div ref={mountRef} className="zone-orbit-scene__canvas" style={{ position: 'absolute', inset: 0 }} />
      {!webglEnabled && selectedZone?.image && (
        <figure className="zone-orbit-scene__poster" style={posterStyle}>
          <img
            src={selectedZone.image}
            alt={`${label} META4PRO`}
            width="1600"
            height="1067"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <figcaption className="zone-orbit-scene__poster-label">{selectedZone.name || label}</figcaption>
        </figure>
      )}
    </div>
  );
}
