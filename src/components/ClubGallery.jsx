import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { galleryItems } from '../data/clubData';
import useMediaQuery from '../hooks/useMediaQuery';

const CircularGallery = lazy(() => import('./CircularGallery'));
const stackItems = galleryItems.filter((item, index) => item.image.includes('gallery-') || index === 3).slice(0, 5);

function PhotoStack({ reducedMotion = false }) {
  return (
    <div className={`photo-stack ${reducedMotion ? 'is-static' : ''}`} aria-label="Фотографии клуба">
      {stackItems.map((item, index) => (
        <figure key={item.image} style={{ '--stack-index': index }}>
          <img src={item.image} alt={item.text} width="1200" height="800" loading="lazy" decoding="async" />
          <figcaption>
            <span>{String(index + 1).padStart(2, '0')} / {String(stackItems.length).padStart(2, '0')}</span>
            <strong>{item.text}</strong>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function ClubGallery() {
  const sectionRef = useRef(null);
  const widePointer = useMediaQuery('(min-width: 1000px) and (hover: hover) and (pointer: fine)');
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [nearViewport, setNearViewport] = useState(false);
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    setWebgl(Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl')));
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !('IntersectionObserver' in window)) {
      setNearViewport(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setNearViewport(entry.isIntersecting),
      { rootMargin: '500px 0px' }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const useCircular = widePointer && webgl && !reducedMotion && nearViewport;

  return (
    <section ref={sectionRef} className="club-section" id="club" aria-labelledby="club-title">
      <div className="club-heading">
        <h2 id="club-title">ВНУТРИ<br />META4PRO</h2>
        <p>Живые кадры из клуба: общий зал, приватные комнаты и детали игровых сетапов.</p>
      </div>

      {useCircular ? (
        <div className="circular-shell" aria-label="Интерактивная галерея клуба">
          <div className="sr-only">
            <p>Листайте галерею колесом мыши или клавишами со стрелками.</p>
            <ul>{galleryItems.map(item => <li key={item.image}>{item.text}</li>)}</ul>
          </div>
          <Suspense fallback={<PhotoStack reducedMotion />}>
            <CircularGallery
              items={galleryItems}
              bend={1.15}
              borderRadius={0}
              scrollSpeed={1.35}
              scrollEase={0.075}
              textColor="#FFD400"
              font='600 22px "Onest Variable"'
            />
          </Suspense>
        </div>
      ) : <PhotoStack reducedMotion={reducedMotion} />}
    </section>
  );
}
