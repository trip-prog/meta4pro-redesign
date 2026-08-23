import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { galleryItems } from '../data/clubData';
import useMediaQuery from '../hooks/useMediaQuery';

const CircularGallery = lazy(() => import('./CircularGallery'));

function PhotoStrip() {
  return (
    <div className="photo-strip" aria-label="Фотографии клуба">
      {galleryItems.map(item => (
        <figure key={item.image}>
          <img src={item.image} alt={item.text} width="1200" height="800" loading="lazy" decoding="async" />
          <figcaption>{item.text}</figcaption>
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
        <h2 id="club-title">ТЕМНО.<br /><span>БЫСТРО.</span><br /><span className="club-last"><i>ПО-</i><i>НАСТОЯЩЕМУ.</i></span></h2>
        <p>Без стоковых киберспортсменов: здесь реальные комнаты, реальные места и свет клуба, в котором ты будешь играть.</p>
      </div>

      {useCircular ? (
        <div className="circular-shell" aria-label="Интерактивная галерея клуба">
          <Suspense fallback={<PhotoStrip />}>
            <CircularGallery
              items={galleryItems}
              bend={1.15}
              borderRadius={0.035}
              scrollSpeed={1.35}
              scrollEase={0.075}
              textColor="#FFD400"
              font='600 22px "Unbounded Variable"'
            />
          </Suspense>
        </div>
      ) : <PhotoStrip />}
    </section>
  );
}
