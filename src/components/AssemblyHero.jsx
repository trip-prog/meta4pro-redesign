import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import ElectricBorder from './ElectricBorder';

const LiquidEther = lazy(() => import('./LiquidEther'));

const clamp = value => Math.min(1, Math.max(0, value));
const smooth = value => value * value * (3 - 2 * value);
const asset = file => `${import.meta.env.BASE_URL}assets/${file}`;

const PARTS = [
  { key: 'case', file: 'case-frame.webp', from: [-210, 48, -11, 0.9], dock: [0, 0, 0.92], start: 0, end: 0.11 },
  { key: 'board', file: 'motherboard.webp', from: [190, -92, 13, 0.8], dock: [-28, -42, 0.48], start: 0.09, end: 0.2 },
  { key: 'cpu', file: 'cpu.webp', from: [-105, -240, -24, 1.2], dock: [-42, -58, 0.15], start: 0.18, end: 0.29 },
  { key: 'ram', file: 'ram.webp', from: [190, -185, 18, 1.12], dock: [48, -55, 0.23], start: 0.27, end: 0.38 },
  { key: 'cooling', file: 'cooler.webp', from: [18, -260, -8, 0.9], dock: [-52, -42, 0.42], start: 0.36, end: 0.47 },
  { key: 'psu', file: 'psu.webp', from: [-205, 190, 16, 0.92], dock: [-46, 108, 0.3], start: 0.45, end: 0.56 },
  { key: 'gpu', file: 'gpu.webp', from: [235, 92, -14, 0.86], dock: [-10, 48, 0.55], start: 0.54, end: 0.65 },
  { key: 'fans', file: 'fans.webp', from: [220, -32, 22, 1.08], dock: [-68, -30, 0.34], start: 0.63, end: 0.74 },
  { key: 'cables', file: 'cables.webp', from: [-42, 235, -10, 0.9], dock: [66, 20, 0.3], start: 0.72, end: 0.83 },
  { key: 'glass', file: 'glass.webp', from: [-255, 12, -17, 1.03], dock: [0, 0, 0.94], start: 0.81, end: 0.92 }
];

const STAGES = [
  ['КОРПУС', 'воздух и геометрия'],
  ['ПЛАТА', 'основа системы'],
  ['CPU', 'i5-14400F'],
  ['ПАМЯТЬ', 'DDR5'],
  ['ОХЛАЖДЕНИЕ', 'держит частоты'],
  ['ПИТАНИЕ', 'чистая энергия'],
  ['ГРАФИКА', 'RTX 4060 Ti'],
  ['ВОЗДУХ', 'три контура'],
  ['КАБЕЛИ', 'сигнал пошёл'],
  ['СТЕКЛО', 'контур закрыт'],
  ['READY', 'до 400 Гц']
];

export default function AssemblyHero() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const pcRef = useRef(null);
  const finalRef = useRef(null);
  const progressRef = useRef(null);
  const readyRef = useRef(null);
  const partRefs = useRef({});
  const lastStage = useRef(-1);
  const [stageIndex, setStageIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [allowEther, setAllowEther] = useState(false);

  useEffect(() => {
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerMedia = window.matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine)');
    const sync = () => {
      setReducedMotion(motionMedia.matches);
      setAllowEther(pointerMedia.matches);
    };
    sync();
    motionMedia.addEventListener('change', sync);
    pointerMedia.addEventListener('change', sync);
    return () => {
      motionMedia.removeEventListener('change', sync);
      pointerMedia.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    let frame = 0;

    const render = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const raw = reducedMotion ? 1 : clamp(-rect.top / travel);
      const progress = smooth(raw);

      const travelScale = Math.min(1.45, Math.max(0.82, window.innerWidth / 390));
      const finalBlend = smooth(clamp((progress - 0.88) / 0.1));
      const buildGhost = smooth(clamp((progress - 0.04) / 0.82));

      PARTS.forEach(config => {
        const element = partRefs.current[config.key];
        if (!element) return;
        const local = smooth(clamp((progress - config.start) / (config.end - config.start)));
        const inverse = 1 - local;
        const [x, y, rotation, scale] = config.from;
        const [dockX, dockY, dockScale] = config.dock;
        const liveScale = scale + (dockScale - scale) * local;
        const liveX = x * inverse * travelScale + dockX * local;
        const liveY = y * inverse * travelScale + dockY * local;
        const enter = smooth(clamp(local / 0.26));
        const leave = 1 - smooth(clamp((local - 0.7) / 0.3));
        element.style.transform = `translate3d(${liveX}px, ${liveY}px, 0) rotate(${rotation * inverse}deg) scale(${liveScale})`;
        element.style.opacity = `${enter * leave * (1 - finalBlend)}`;
        element.style.filter = `blur(${(1 - enter) * 5}px) brightness(${0.88 + enter * 0.12})`;
      });

      if (finalRef.current) {
        const finalOpacity = clamp(buildGhost * 0.16 + finalBlend * 0.84);
        finalRef.current.style.opacity = `${finalOpacity}`;
        finalRef.current.style.transform = `scale(${1.03 - finalBlend * 0.03})`;
        finalRef.current.style.filter = `brightness(${0.42 + finalBlend * 0.58}) saturate(${0.78 + finalBlend * 0.22})`;
      }

      if (introRef.current) {
        introRef.current.style.opacity = `${clamp(1 - progress * 3.8)}`;
        introRef.current.style.transform = `translateY(${-progress * 34}px)`;
      }
      if (pcRef.current) {
        pcRef.current.style.transform = `translate(-50%, -50%) scale(${0.9 + progress * 0.1})`;
      }
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleY(${Math.max(0.015, progress)})`;
      }
      if (readyRef.current) {
        const ready = clamp((progress - 0.91) * 12);
        readyRef.current.style.opacity = `${ready}`;
        readyRef.current.style.transform = `translateY(${(1 - ready) * 18}px)`;
        readyRef.current.style.pointerEvents = ready > 0.9 ? 'auto' : 'none';
      }

      const nextStage = Math.min(STAGES.length - 1, Math.floor(progress * STAGES.length));
      if (nextStage !== lastStage.current) {
        lastStage.current = nextStage;
        setStageIndex(nextStage);
      }
    };

    const requestRender = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    render();
    window.addEventListener('scroll', requestRender, { passive: true });
    window.addEventListener('resize', requestRender);
    return () => {
      window.removeEventListener('scroll', requestRender);
      window.removeEventListener('resize', requestRender);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  const bindPart = key => element => {
    partRefs.current[key] = element;
  };

  return (
    <section className="assembly" ref={sectionRef} aria-label="Сборка игрового компьютера">
      <div className="assembly-sticky">
        <div className="ether-layer" aria-hidden="true">
          {allowEther && !reducedMotion && (
            <Suspense fallback={null}>
              <LiquidEther
                colors={['#FFD400', '#4A4100', '#111111']}
                mouseForce={14}
                cursorSize={76}
                resolution={0.26}
                BFECC={false}
                isViscous={false}
                iterationsPoisson={14}
                autoDemo
                autoSpeed={0.22}
                autoIntensity={1.05}
                takeoverDuration={0.15}
                autoResumeDelay={2400}
              />
            </Suspense>
          )}
        </div>

        <div className="assembly-intro" ref={introRef}>
          <p className="eyebrow">META4PRO · РОСТОВ-НА-ДОНУ</p>
          <h1>
            СОБЕРИ
            <span>СВОЮ НОЧЬ</span>
          </h1>
          <p className="assembly-lead">Листай. Каждая деталь встанет на своё место.</p>
        </div>

        <div className="pc-wrap" ref={pcRef} aria-hidden="true">
          <div className="pc-photo-stack" role="img" aria-label="Фотореалистичный игровой компьютер собирается из отдельных деталей">
            {PARTS.map(part => (
              <img
                key={part.key}
                ref={bindPart(part.key)}
                className={`pc-photo-layer pc-photo-${part.key}`}
                src={asset(`pc-v3/${part.file}`)}
                alt=""
                draggable="false"
                decoding="async"
              />
            ))}
            <img
              ref={finalRef}
              className="pc-photo-final"
              src={asset('pc-v3/pc-final.webp')}
              alt=""
              draggable="false"
              decoding="async"
            />
          </div>
        </div>

        <div className="assembly-stage" aria-live="polite">
          <span>{String(stageIndex + 1).padStart(2, '0')} / {STAGES.length}</span>
          <strong>{STAGES[stageIndex][0]}</strong>
          <small>{STAGES[stageIndex][1]}</small>
        </div>

        <div className="assembly-rail" aria-hidden="true"><i ref={progressRef} /></div>

        <div className="assembly-ready" ref={readyRef}>
          <ElectricBorder color="#FFD400" speed={0.82} chaos={0.09} borderRadius={2}>
            <a className="assembly-cta" href="#zones">
              <span>ВЫБРАТЬ ЗОНУ</span><b>→</b>
            </a>
          </ElectricBorder>
        </div>
      </div>
    </section>
  );
}
