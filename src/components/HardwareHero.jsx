import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import ElectricBorder from './ElectricBorder';

const LiquidEther = lazy(() => import('./LiquidEther'));

const clamp = value => Math.min(1, Math.max(0, value));
const easeOut = value => 1 - Math.pow(1 - value, 4);
const asset = file => `${import.meta.env.BASE_URL}assets/${file}`;

const parts = [
  { key: 'case', file: 'case.webp', start: -0.08, end: 0.02, from: [0, 28, 0, 0.96] },
  { key: 'motherboard', file: 'motherboard.webp', start: 0.08, end: 0.2, from: [42, -28, 7, 0.82] },
  { key: 'cpu', file: 'cpu.webp', start: 0.18, end: 0.3, from: [-46, -38, -11, 1.18] },
  { key: 'ram', file: 'ram.webp', start: 0.28, end: 0.4, from: [48, -34, 9, 1.08] },
  { key: 'cooler', file: 'cooler.webp', start: 0.38, end: 0.5, from: [-45, -10, -8, 0.9] },
  { key: 'gpu', file: 'gpu.webp', start: 0.48, end: 0.62, from: [46, 18, 6, 0.92] },
  { key: 'fans', file: 'fans.webp', start: 0.6, end: 0.72, from: [-44, 28, -7, 1.08] },
  { key: 'cables', file: 'cables.webp', start: 0.7, end: 0.82, from: [38, 36, 8, 0.95] },
  { key: 'glass', file: 'glass.webp', start: 0.8, end: 0.9, from: [-48, 2, -8, 1.04] }
];

const stages = [
  ['КОРПУС', 'каркас системы'],
  ['ПЛАТА', 'всё начинается здесь'],
  ['ПРОЦЕССОР', 'Intel Core i5-14400F'],
  ['ПАМЯТЬ', '16 ГБ DDR5'],
  ['ОХЛАЖДЕНИЕ', 'частоты под контролем'],
  ['ГРАФИКА', 'GeForce RTX 4060 Ti'],
  ['ВОЗДУХ', 'ровный поток'],
  ['КАБЕЛИ', 'питание подано'],
  ['СТЕКЛО', 'система закрыта'],
  ['READY', 'до 400 Гц в SIGMA']
];

export default function HardwareHero() {
  const sectionRef = useRef(null);
  const copyRef = useRef(null);
  const rigRef = useRef(null);
  const finalRef = useRef(null);
  const finishRef = useRef(null);
  const railRef = useRef(null);
  const partRefs = useRef({});
  const lastStage = useRef(-1);
  const [stage, setStage] = useState(0);
  const [nearViewport, setNearViewport] = useState(true);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const desktopPointer = useMediaQuery('(min-width: 1024px) and (hover: hover) and (pointer: fine)');

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
      const finalBlend = easeOut(clamp((progress - 0.84) / 0.13));
      const compact = window.innerWidth < 720;

      parts.forEach(part => {
        const element = partRefs.current[part.key];
        if (!element) return;
        const local = easeOut(clamp((progress - part.start) / (part.end - part.start)));
        const [x, y, rotate, scale] = part.from;
        const distance = compact ? 0.74 : 1;
        element.style.transform = `translate3d(${x * (1 - local) * distance}vw, ${y * (1 - local) * distance}vh, 0) rotate(${rotate * (1 - local)}deg) scale(${scale + (1 - scale) * local})`;
        element.style.opacity = `${local * (1 - finalBlend)}`;
      });

      if (finalRef.current) {
        finalRef.current.style.opacity = `${finalBlend}`;
        finalRef.current.style.transform = `scale(${1.035 - finalBlend * 0.035})`;
      }
      if (copyRef.current) {
        const copyExit = easeOut(clamp((progress - 0.18) / 0.22));
        copyRef.current.style.opacity = `${1 - copyExit * 0.88}`;
        copyRef.current.style.transform = `translate3d(0, ${-copyExit * 38}px, 0)`;
      }
      if (rigRef.current) {
        rigRef.current.style.transform = `translate3d(0, ${Math.sin(progress * Math.PI) * -10}px, 0) scale(${0.96 + progress * 0.04})`;
      }
      if (railRef.current) railRef.current.style.transform = `scaleX(${Math.max(0.015, progress)})`;
      if (finishRef.current) {
        const ready = easeOut(clamp((progress - 0.9) / 0.08));
        finishRef.current.style.opacity = `${ready}`;
        finishRef.current.style.transform = `translate3d(0, ${(1 - ready) * 20}px, 0)`;
        finishRef.current.style.pointerEvents = ready > 0.92 ? 'auto' : 'none';
      }

      const nextStage = Math.min(stages.length - 1, Math.floor(progress * stages.length));
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

  const setPartRef = key => element => {
    partRefs.current[key] = element;
  };

  return (
    <section ref={sectionRef} className="hardware-hero" aria-labelledby="hero-title">
      <div className="hero-sticky">
        <div className="hero-photo" aria-hidden="true" />
        <div className="hero-ether" aria-hidden="true">
          {desktopPointer && nearViewport && !reducedMotion && (
            <Suspense fallback={null}>
              <LiquidEther
                colors={['#FFD400', '#6D5D00', '#12120F']}
                mouseForce={11}
                cursorSize={68}
                resolution={0.22}
                BFECC={false}
                isViscous={false}
                iterationsPoisson={10}
                autoDemo
                autoSpeed={0.18}
                autoIntensity={0.86}
                takeoverDuration={0.18}
                autoResumeDelay={2600}
              />
            </Suspense>
          )}
        </div>

        <div ref={copyRef} className="hero-copy">
          <h1 id="hero-title">ИГРАЙ<br />НА СВОЕЙ<br /><span>ЧАСТОТЕ</span></h1>
          <p className="hero-location">Ростов-на-Дону · 24/7</p>
          <p className="hero-lead">36 игровых ПК, четыре режима и до 400 Гц рядом с ТРЦ «Горизонт».</p>
          <div className="hero-actions">
            <a className="button button-signal" href="#zones">Выбрать зону <ArrowUpRight aria-hidden="true" /></a>
            <a className="text-link" href="#club">Увидеть клуб <ArrowDown aria-hidden="true" /></a>
          </div>
        </div>

        <div ref={rigRef} className="rig-stage" role="img" aria-label="Игровой компьютер собирается из отдельных деталей">
          <div className="rig-halo" aria-hidden="true" />
          {parts.map((part, index) => (
            <img
              key={part.key}
              ref={setPartRef(part.key)}
              className={`rig-part rig-part-${part.key}`}
              src={asset(`rig-v4-fixed/${part.file}`)}
              alt=""
              aria-hidden="true"
              draggable="false"
              loading={index < 3 ? 'eager' : 'lazy'}
              decoding="async"
            />
          ))}
          <img
            ref={finalRef}
            className="rig-final"
            src={asset('pc-v3/pc-final.webp')}
            alt=""
            aria-hidden="true"
            draggable="false"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        <div className="hero-status" aria-live="polite">
          <span>{String(stage + 1).padStart(2, '0')} / {stages.length}</span>
          <strong>{stages[stage][0]}</strong>
          <small>{stages[stage][1]}</small>
        </div>

        <div className="hero-progress" aria-hidden="true"><i ref={railRef} /></div>

        <div ref={finishRef} className="hero-finish">
          <ElectricBorder color="#FFD400" speed={0.7} chaos={0.055} borderRadius={12}>
            <a className="finish-link" href="#zones">Система готова — выбрать место <ArrowUpRight aria-hidden="true" /></a>
          </ElectricBorder>
        </div>
      </div>
    </section>
  );
}
