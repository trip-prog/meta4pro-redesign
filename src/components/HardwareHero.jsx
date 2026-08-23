import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import ElectricBorder from './ElectricBorder';

const LiquidEther = lazy(() => import('./LiquidEther'));

const VIEWBOX = { width: 1122, height: 1402, centerX: 561, centerY: 701 };
const ETHER_COLORS = ['#2f2700', '#d6ae00', '#ffd400'];
const clamp = value => Math.min(1, Math.max(0, value));
const easeOut = value => 1 - Math.pow(1 - value, 4);
const asset = file => `${import.meta.env.BASE_URL}assets/${file}`;

const parts = [
  {
    key: 'motherboard', file: 'motherboard.webp', start: 0.07, end: 0.19,
    stage: 'rig-v5/stage-board.webp', dock: [0.576, 0.428, 195, 248], from: [820, -190, 9, 0.82]
  },
  {
    key: 'cpu', file: 'cpu.webp', start: 0.19, end: 0.29,
    stage: 'rig-v5/stage-cpu.webp', dock: [0.439, 0.559, 263, 183], from: [-760, -280, -18, 1.18]
  },
  {
    key: 'ram', file: 'ram.webp', start: 0.29, end: 0.4,
    stage: 'rig-v5/stage-ram.webp', dock: [0.351, 0.475, 379, 261], from: [720, -210, 11, 1.08]
  },
  {
    key: 'cooler', file: 'cooler.webp', start: 0.4, end: 0.54,
    stage: 'rig-v5/stage-cooler.webp', dock: [0.744, 0.526, 7, 209], from: [-820, 80, -9, 0.9]
  },
  {
    key: 'gpu', file: 'gpu.webp', start: 0.54, end: 0.67,
    stage: 'rig-v5/stage-gpu.webp', dock: [0.647, 0.591, 107, 416], from: [850, 170, 7, 0.88]
  },
  {
    key: 'cables', file: 'cables.webp', start: 0.67, end: 0.8,
    stage: 'rig-v5/stage-cables.webp', dock: [0.652, 0.643, 278, 234], from: [660, 430, 8, 0.94]
  },
  {
    key: 'glass', file: 'glass.webp', start: 0.8, end: 0.93,
    stage: 'pc-v3/pc-final.webp', dock: [0.965, 0.794, -83, 96], from: [-980, 10, -7, 1.04]
  }
];

const stages = [
  { at: 0, title: 'КОРПУС', detail: 'неподвижная база' },
  { at: 0.07, title: 'МАТЕРИНСКАЯ ПЛАТА', detail: 'садится на стойки' },
  { at: 0.19, title: 'ПРОЦЕССОР', detail: 'фиксируется в сокете' },
  { at: 0.29, title: 'ПАМЯТЬ', detail: 'защёлкивается в слотах' },
  { at: 0.4, title: 'ОХЛАЖДЕНИЕ', detail: 'помпа и радиатор на месте' },
  { at: 0.54, title: 'ВИДЕОКАРТА', detail: 'входит в PCIe' },
  { at: 0.67, title: 'ПИТАНИЕ', detail: 'кабели уложены' },
  { at: 0.8, title: 'СТЕКЛО', detail: 'контур закрыт' },
  { at: 0.95, title: 'ГОТОВ', detail: 'можно выбирать место' }
];

const dockTransform = ([scaleX, scaleY, x, y]) =>
  `matrix(${scaleX} 0 0 ${scaleY} ${x} ${y})`;

export default function HardwareHero() {
  const sectionRef = useRef(null);
  const copyRef = useRef(null);
  const finishRef = useRef(null);
  const railRef = useRef(null);
  const flightRefs = useRef({});
  const stageRefs = useRef({});
  const lastStage = useRef(-1);
  const [stage, setStage] = useState(0);
  const [nearViewport, setNearViewport] = useState(true);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const compact = useMediaQuery('(max-width: 767px), (hover: none), (pointer: coarse)');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setNearViewport(entry.isIntersecting),
      { rootMargin: '300px 0px' }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;

    const render = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = reducedMotion ? 1 : clamp(-rect.top / travel);

      parts.forEach(part => {
        const flight = flightRefs.current[part.key];
        const stageFrame = stageRefs.current[part.key];
        const local = easeOut(clamp((progress - part.start) / (part.end - part.start)));
        const lockBlend = easeOut(clamp((local - 0.8) / 0.2));
        const [x, y, rotate, scale] = part.from;
        const approach = 1 - local;

        if (flight) {
          const transform = local >= 0.999
            ? ''
            : `translate(${x * approach} ${y * approach}) translate(${VIEWBOX.centerX} ${VIEWBOX.centerY}) rotate(${rotate * approach}) scale(${scale + (1 - scale) * local}) translate(${-VIEWBOX.centerX} ${-VIEWBOX.centerY})`;
          if (transform) flight.setAttribute('transform', transform);
          else flight.removeAttribute('transform');
          flight.style.opacity = `${local * (1 - lockBlend)}`;
        }

        if (stageFrame) stageFrame.style.opacity = `${lockBlend}`;
      });

      if (copyRef.current) {
        const copyExit = easeOut(clamp((progress - 0.06) / 0.18));
        copyRef.current.style.opacity = `${1 - copyExit}`;
        copyRef.current.style.transform = `translate3d(0, ${-copyExit * 30}px, 0)`;
        copyRef.current.style.pointerEvents = copyExit > 0.75 ? 'none' : 'auto';
      }

      if (railRef.current) railRef.current.style.transform = `scaleX(${Math.max(0.012, progress)})`;

      if (finishRef.current) {
        const ready = easeOut(clamp((progress - 0.94) / 0.055));
        finishRef.current.style.opacity = `${ready}`;
        finishRef.current.style.transform = `translate3d(0, ${(1 - ready) * 18}px, 0)`;
        finishRef.current.style.pointerEvents = ready > 0.92 ? 'auto' : 'none';
      }

      let nextStage = 0;
      for (let index = stages.length - 1; index >= 0; index -= 1) {
        if (progress >= stages[index].at) {
          nextStage = index;
          break;
        }
      }
      if (nextStage !== lastStage.current) {
        lastStage.current = nextStage;
        setStage(nextStage);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    render();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="hardware-hero" aria-labelledby="hero-title">
      <div className="hero-sticky">
        <div className="hero-photo" style={{ backgroundImage: `url(${asset('gallery-night.webp')})` }} aria-hidden="true" />
        <div className="hero-ether" aria-hidden="true">
          {nearViewport && !reducedMotion && (
            <Suspense fallback={null}>
              <LiquidEther
                colors={ETHER_COLORS}
                mouseForce={compact ? 26 : 15}
                cursorSize={compact ? 108 : 128}
                resolution={compact ? 0.14 : 0.24}
                maxDpr={compact ? 1 : 1.5}
                maxFps={compact ? 30 : 60}
                BFECC={!compact}
                isViscous
                viscous={compact ? 18 : 24}
                iterationsViscous={compact ? 4 : 8}
                iterationsPoisson={compact ? 5 : 10}
                autoDemo
                autoSpeed={compact ? 0.3 : 0.2}
                autoIntensity={compact ? 2.6 : 1.45}
                takeoverDuration={0.22}
                autoResumeDelay={compact ? 260 : 1200}
              />
            </Suspense>
          )}
        </div>

        <div ref={copyRef} className="hero-copy">
          <h1 id="hero-title">META<span>4</span>PRO</h1>
          <p className="hero-location">Компьютерный клуб в Ростове-на-Дону · 24/7</p>
          <p className="hero-lead">36 игровых ПК, четыре зоны и мониторы до 400 Гц рядом с ТРЦ «Горизонт».</p>
          <div className="hero-actions">
            <a className="button button-signal" href="#zones">Выбрать зону <ArrowUpRight aria-hidden="true" /></a>
            <a className="text-link" href="#club">Посмотреть клуб <ArrowDown aria-hidden="true" /></a>
          </div>
        </div>

        <div className="rig-stage" role="img" aria-label="Игровой компьютер: корпус остаётся неподвижным, а комплектующие по очереди встают на свои места">
          <div className="rig-halo" aria-hidden="true" />
          <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} aria-hidden="true" focusable="false">
            <image
              className="rig-case"
              href={asset('rig-v5/case-empty-exact.webp')}
              width={VIEWBOX.width}
              height={VIEWBOX.height}
              preserveAspectRatio="none"
            />

            {parts.map(part => (
              <g key={part.key}>
                <g ref={element => { flightRefs.current[part.key] = element; }} className="rig-flight">
                  <g transform={dockTransform(part.dock)}>
                    <image
                      href={asset(`rig-v4-fixed/${part.file}`)}
                      width={VIEWBOX.width}
                      height={VIEWBOX.height}
                      preserveAspectRatio="none"
                    />
                  </g>
                </g>
                <image
                  ref={element => { stageRefs.current[part.key] = element; }}
                  className="rig-stage-frame"
                  href={asset(part.stage)}
                  width={VIEWBOX.width}
                  height={VIEWBOX.height}
                  preserveAspectRatio="none"
                />
              </g>
            ))}
          </svg>
        </div>

        <div className="hero-status">
          <span>{String(stage + 1).padStart(2, '0')} / {String(stages.length).padStart(2, '0')}</span>
          <strong>{stages[stage].title}</strong>
          <small>{stages[stage].detail}</small>
        </div>

        <div className="hero-progress" aria-hidden="true"><i ref={railRef} /></div>

        <div ref={finishRef} className="hero-finish">
          <ElectricBorder color="#FFD400" speed={0.68} chaos={0.045} borderRadius={999}>
            <a className="finish-link" href="#zones">Компьютер собран — выбрать зону <ArrowUpRight aria-hidden="true" /></a>
          </ElectricBorder>
        </div>
      </div>
    </section>
  );
}
