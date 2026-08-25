import { useEffect, useRef } from 'react';
import './atmosphere.css';

const TAU = Math.PI * 2;

export default function AtmosphereFX({ className = '' }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true, desynchronized: true });
    if (!root || !canvas || !context) return undefined;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = { x: 0, y: 0, energy: 0, active: false, lastImpulse: 0 };
    let width = 1;
    let height = 1;
    let dpr = 1;
    let mobile = true;
    let ribbons = [];
    let blobs = [];
    let bolts = [];
    let impulses = [];
    let resizeObserver;
    let visibilityObserver;
    let frame = 0;
    let lastDraw = 0;
    let nextBoltAt = 0;
    let running = false;
    let visible = true;
    let reducedMotion = motionQuery.matches;
    let destroyed = false;

    const random = (min, max) => min + Math.random() * (max - min);

    function buildScene() {
      const ribbonCount = mobile ? 3 : 5;
      const blobCount = mobile ? 4 : 7;

      ribbons = Array.from({ length: ribbonCount }, (_, index) => {
        const gradient = context.createLinearGradient(-width * 0.1, 0, width * 1.1, 0);
        gradient.addColorStop(0, 'rgba(255, 184, 0, 0)');
        gradient.addColorStop(0.2, index % 2 ? '#c98200' : '#ffb800');
        gradient.addColorStop(0.52, '#ffe56c');
        gradient.addColorStop(0.78, index % 2 ? '#ffca28' : '#d89100');
        gradient.addColorStop(1, 'rgba(255, 184, 0, 0)');
        return {
          y: (index + 0.55) / ribbonCount,
          phase: random(0, TAU),
          speed: random(0.08, 0.17),
          waves: random(1.15, 2.15),
          amplitude: random(0.035, 0.085),
          tilt: random(-0.14, 0.14),
          width: random(mobile ? 20 : 28, mobile ? 42 : 62),
          gradient
        };
      });

      blobs = Array.from({ length: blobCount }, (_, index) => ({
        x: random(0.05, 0.95),
        y: random(0.04, 0.96),
        radius: random(mobile ? 34 : 50, mobile ? 88 : 130),
        phase: random(0, TAU),
        speed: random(0.05, 0.13),
        stretch: random(0.65, 1.45),
        brightGold: index % 2 === 0
      }));

      bolts = [];
      impulses = [];
      nextBoltAt = performance.now() + random(650, 1400);
      if (!pointer.active) {
        pointer.x = width * 0.62;
        pointer.y = height * 0.38;
      }
    }

    function resize() {
      const rect = root.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      mobile = width < 700 || matchMedia('(pointer: coarse)').matches;
      const dprByArea = Math.sqrt(2_200_000 / (width * height));
      dpr = Math.max(0.75, Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5, dprByArea));
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildScene();
      draw(performance.now(), reducedMotion);
    }

    function drawRibbon(ribbon, seconds) {
      const points = mobile ? 18 : 28;
      context.beginPath();
      for (let index = 0; index <= points; index += 1) {
        const progress = index / points;
        const x = (progress * 1.24 - 0.12) * width;
        const base = ribbon.y * height + (progress - 0.5) * ribbon.tilt * height;
        const wave = Math.sin(progress * TAU * ribbon.waves + ribbon.phase + seconds * ribbon.speed * TAU);
        let y = base + wave * height * ribbon.amplitude;
        if (pointer.energy > 0.01) {
          const influence = Math.exp(-Math.pow((x - pointer.x) / Math.max(120, width * 0.24), 2)) * pointer.energy;
          y += (pointer.y - y) * influence * 0.24;
        }
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }

      context.save();
      context.globalCompositeOperation = 'screen';
      context.globalAlpha = 0.34;
      context.strokeStyle = ribbon.gradient;
      context.lineWidth = ribbon.width;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.shadowColor = '#ffb400';
      context.shadowBlur = mobile ? 15 : 24;
      context.stroke();
      context.globalAlpha = 0.72;
      context.lineWidth = Math.max(1.2, ribbon.width * 0.075);
      context.shadowBlur = 10;
      context.strokeStyle = '#fff7d6';
      context.stroke();
      context.restore();
    }

    function drawBlob(blob, seconds) {
      let x = blob.x * width + Math.sin(seconds * blob.speed * TAU + blob.phase) * width * 0.035;
      let y = blob.y * height + Math.cos(seconds * blob.speed * TAU * 0.76 + blob.phase) * height * 0.025;
      const distance = Math.hypot(pointer.x - x, pointer.y - y);
      const influence = pointer.energy * Math.max(0, 1 - distance / Math.max(180, width * 0.28));
      x += (pointer.x - x) * influence * 0.09;
      y += (pointer.y - y) * influence * 0.09;
      const radius = blob.radius * (0.92 + Math.sin(seconds * 0.4 + blob.phase) * 0.08);
      const gradient = context.createRadialGradient(-radius * 0.25, -radius * 0.28, radius * 0.04, 0, 0, radius);
      gradient.addColorStop(0, 'rgba(255,255,247,.9)');
      gradient.addColorStop(0.13, blob.brightGold ? 'rgba(255,213,74,.72)' : 'rgba(255,174,0,.72)');
      gradient.addColorStop(0.48, blob.brightGold ? 'rgba(116,70,0,.34)' : 'rgba(68,53,20,.34)');
      gradient.addColorStop(0.76, 'rgba(255,199,65,.14)');
      gradient.addColorStop(1, 'rgba(4,4,3,0)');

      context.save();
      context.translate(x, y);
      context.rotate(Math.sin(seconds * blob.speed + blob.phase) * 0.55);
      context.scale(blob.stretch, 1 / blob.stretch);
      context.globalCompositeOperation = 'screen';
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(0, 0, radius, 0, TAU);
      context.fill();
      context.globalAlpha = 0.5;
      context.strokeStyle = blob.brightGold ? '#ffd45a' : '#c88912';
      context.lineWidth = 1.2;
      context.stroke();
      context.restore();
    }

    function spawnBolt(targetX, targetY, born = performance.now(), strong = false) {
      const fromLeft = Math.random() > 0.5;
      const startX = fromLeft ? -width * 0.08 : width * 1.08;
      const startY = random(-height * 0.05, height * 0.8);
      const segments = mobile ? 8 : 12;
      const points = [];
      const dx = targetX - startX;
      const dy = targetY - startY;
      const length = Math.max(1, Math.hypot(dx, dy));
      const normalX = -dy / length;
      const normalY = dx / length;
      for (let index = 0; index <= segments; index += 1) {
        const progress = index / segments;
        const taper = Math.sin(progress * Math.PI);
        const jitter = index === 0 || index === segments ? 0 : random(-1, 1) * taper * (mobile ? 20 : 34);
        points.push({
          x: startX + dx * progress + normalX * jitter,
          y: startY + dy * progress + normalY * jitter
        });
      }
      bolts.push({ points, born, strong, life: random(strong ? 500 : 360, strong ? 720 : 560) });
      if (bolts.length > 3) bolts.shift();
    }

    function drawBolt(bolt, now) {
      const progress = Math.max(0, Math.min(1, (now - bolt.born) / bolt.life));
      const alpha = Math.sin(progress * Math.PI) * (1 - progress * 0.3);
      if (alpha <= 0) return;
      context.save();
      context.globalCompositeOperation = 'screen';
      context.lineCap = 'round';
      context.lineJoin = 'miter';
      context.beginPath();
      bolt.points.forEach((point, index) => {
        if (index === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      });
      context.globalAlpha = alpha * (bolt.strong ? 0.62 : 0.46);
      context.strokeStyle = '#ffb800';
      context.lineWidth = mobile ? (bolt.strong ? 10 : 7) : (bolt.strong ? 13 : 11);
      context.shadowColor = '#ffc400';
      context.shadowBlur = mobile ? (bolt.strong ? 24 : 18) : 28;
      context.stroke();
      context.globalAlpha = alpha;
      context.strokeStyle = '#fff7d6';
      context.lineWidth = mobile ? (bolt.strong ? 1.8 : 1.2) : 1.7;
      context.shadowBlur = 6;
      context.stroke();
      context.restore();
    }

    function addImpulse(x, y, now = performance.now(), strong = false) {
      impulses.push({ x, y, born: now, life: strong ? (mobile ? 760 : 700) : 620, strong, angle: random(0, TAU) });
      if (impulses.length > 6) impulses.shift();
    }

    function drawImpulse(impulse, now) {
      const progress = (now - impulse.born) / impulse.life;
      if (progress < 0 || progress > 1) return;
      context.save();
      context.globalCompositeOperation = 'screen';
      context.globalAlpha = Math.pow(1 - progress, 2) * 0.82;
      context.strokeStyle = '#ffc400';
      context.shadowColor = '#ffb800';
      context.shadowBlur = impulse.strong && mobile ? 20 : 14;
      context.lineWidth = impulse.strong && mobile ? 2.2 : 1.5;
      context.beginPath();
      context.arc(impulse.x, impulse.y, 10 + progress * (mobile ? 64 : 92), 0, TAU);
      context.stroke();

      if (impulse.strong) {
        const sparkFade = Math.pow(1 - progress, 3);
        const sparkCount = mobile ? 7 : 5;
        context.translate(impulse.x, impulse.y);
        context.rotate(impulse.angle);
        context.globalAlpha = sparkFade * 0.94;
        context.strokeStyle = '#fff4c7';
        context.shadowColor = '#ffc400';
        context.shadowBlur = mobile ? 12 : 10;
        context.lineWidth = mobile ? 1.8 : 1.4;
        context.lineCap = 'round';
        context.beginPath();
        for (let index = 0; index < sparkCount; index += 1) {
          const angle = index / sparkCount * TAU;
          const inner = 8 + progress * 14;
          const outer = inner + (mobile ? 28 : 22) * (1 - progress);
          context.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
          context.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
        }
        context.stroke();

        const flare = context.createRadialGradient(0, 0, 0, 0, 0, mobile ? 26 : 20);
        flare.addColorStop(0, 'rgba(255,255,255,.96)');
        flare.addColorStop(0.28, 'rgba(255,205,64,.72)');
        flare.addColorStop(1, 'rgba(255,178,0,0)');
        context.globalAlpha = sparkFade * 0.72;
        context.fillStyle = flare;
        context.beginPath();
        context.arc(0, 0, mobile ? 26 : 20, 0, TAU);
        context.fill();
      }
      context.restore();
    }

    function drawStaticBolt() {
      const points = [
        { x: width * 0.92, y: -height * 0.05 },
        { x: width * 0.79, y: height * 0.18 },
        { x: width * 0.84, y: height * 0.25 },
        { x: width * 0.64, y: height * 0.49 },
        { x: width * 0.69, y: height * 0.56 },
        { x: width * 0.52, y: height * 0.78 }
      ];
      drawBolt({ points, born: -180, life: 900 }, 0);
    }

    function draw(now, staticFrame = false) {
      context.clearRect(0, 0, width, height);
      const seconds = now * 0.001;
      pointer.energy += ((pointer.active ? 1 : 0) - pointer.energy) * (staticFrame ? 1 : 0.08);

      ribbons.forEach(ribbon => drawRibbon(ribbon, seconds));
      blobs.forEach(blob => drawBlob(blob, seconds));

      if (staticFrame) {
        drawStaticBolt();
        return;
      }

      if (now >= nextBoltAt) {
        spawnBolt(pointer.active ? pointer.x : random(width * 0.25, width * 0.85), pointer.active ? pointer.y : random(height * 0.2, height * 0.85), now);
        nextBoltAt = now + random(mobile ? 1800 : 1400, mobile ? 3100 : 2600);
      }
      bolts = bolts.filter(bolt => now - bolt.born < bolt.life);
      impulses = impulses.filter(impulse => now - impulse.born < impulse.life);
      bolts.forEach(bolt => drawBolt(bolt, now));
      impulses.forEach(impulse => drawImpulse(impulse, now));
    }

    function loop(now) {
      if (!running || destroyed) return;
      const frameInterval = 1000 / (mobile ? 30 : 45);
      if (now - lastDraw >= frameInterval) {
        lastDraw = now;
        draw(now);
      }
      frame = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frame);
      frame = 0;
    }

    function start() {
      if (running || reducedMotion || !visible || document.hidden || destroyed) return;
      running = true;
      lastDraw = 0;
      frame = requestAnimationFrame(loop);
    }

    function localPoint(event) {
      const rect = root.getBoundingClientRect();
      const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!inside) {
        if (event.pointerType === 'mouse') pointer.active = false;
        return false;
      }
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
      return true;
    }

    function onPointerMove(event) {
      if (reducedMotion || !visible || !localPoint(event)) return;
      const now = performance.now();
      if (now - pointer.lastImpulse > 180 && event.pointerType !== 'mouse') {
        addImpulse(pointer.x, pointer.y, now);
        pointer.lastImpulse = now;
      }
    }

    function onPointerDown(event) {
      if (reducedMotion || !visible || !localPoint(event)) return;
      const now = performance.now();
      const strongTouch = event.pointerType !== 'mouse';
      addImpulse(pointer.x, pointer.y, now, strongTouch);
      spawnBolt(pointer.x, pointer.y, now, strongTouch);
      if (strongTouch) pointer.energy = Math.max(pointer.energy, mobile ? 0.98 : 0.82);
      pointer.lastImpulse = now;
    }

    function onPointerEnd(event) {
      if (event.pointerType !== 'mouse') pointer.active = false;
    }

    function syncMotion() {
      reducedMotion = motionQuery.matches;
      if (reducedMotion) {
        stop();
        pointer.active = false;
        draw(performance.now(), true);
      } else {
        start();
      }
    }

    function syncDocumentVisibility() {
      if (document.hidden) stop();
      else start();
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerEnd, { passive: true });
    window.addEventListener('pointercancel', onPointerEnd, { passive: true });
    window.addEventListener('blur', onPointerEnd);
    document.addEventListener('visibilitychange', syncDocumentVisibility);
    motionQuery.addEventListener('change', syncMotion);

    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(root);
    } else {
      window.addEventListener('resize', resize, { passive: true });
    }

    if ('IntersectionObserver' in window) {
      visibilityObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      }, { rootMargin: '160px 0px' });
      visibilityObserver.observe(root);
    }

    resize();
    syncMotion();

    return () => {
      destroyed = true;
      stop();
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      if (!resizeObserver) window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerEnd);
      window.removeEventListener('pointercancel', onPointerEnd);
      window.removeEventListener('blur', onPointerEnd);
      document.removeEventListener('visibilitychange', syncDocumentVisibility);
      motionQuery.removeEventListener('change', syncMotion);
      canvas.width = 1;
      canvas.height = 1;
    };
  }, []);

  return (
    <div ref={rootRef} className={`atmosphere-fx ${className}`.trim()} aria-hidden="true">
      <canvas ref={canvasRef} className="atmosphere-fx__canvas" />
    </div>
  );
}
