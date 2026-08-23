import { ArrowUpRight } from 'lucide-react';
import { zones } from '../data/clubData';

export default function ZoneExplorer({ selectedIndex, onSelect }) {
  const zone = zones[selectedIndex];

  const handleTabKey = (event, index) => {
    const moves = {
      ArrowRight: (index + 1) % zones.length,
      ArrowDown: (index + 1) % zones.length,
      ArrowLeft: (index - 1 + zones.length) % zones.length,
      ArrowUp: (index - 1 + zones.length) % zones.length,
      Home: 0,
      End: zones.length - 1
    };
    const nextIndex = moves[event.key];
    if (nextIndex === undefined) return;
    event.preventDefault();
    onSelect(nextIndex);
    event.currentTarget.parentElement?.querySelectorAll('[role="tab"]')[nextIndex]?.focus();
  };

  const chooseAndBook = () => {
    onSelect(selectedIndex);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelector('#booking')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <section className="zones-section" id="zones" aria-labelledby="zones-title">
      <div className="section-heading zones-heading">
        <h2 id="zones-title">ВЫБЕРИ<br />ЗОНУ</h2>
        <p>Сравни цену, железо и формат: общий зал, арена или отдельная комната для команды.</p>
      </div>

      <div className="zone-workbench">
        <div className="zone-list" role="tablist" aria-label="Игровые зоны">
          {zones.map((item, index) => (
            <button
              key={item.id}
              id={`zone-tab-${item.id}`}
              className={index === selectedIndex ? 'is-active' : ''}
              type="button"
              role="tab"
              aria-selected={index === selectedIndex}
              aria-controls="zone-panel"
              tabIndex={index === selectedIndex ? 0 : -1}
              onClick={() => onSelect(index)}
              onKeyDown={event => handleTabKey(event, index)}
            >
              <span className="zone-name"><b>{item.name}</b><small>{item.label}</small></span>
              <span className="zone-hz">{item.hz.replace(' IPS', '')}</span>
              <span className="zone-price">от <b>{item.price}</b> ₽/ч</span>
            </button>
          ))}
        </div>

        <article
          id="zone-panel"
          className="zone-panel"
          role="tabpanel"
          aria-labelledby={`zone-tab-${zone.id}`}
          tabIndex={0}
        >
          <figure className="zone-visual">
            <img key={zone.image} src={zone.image} alt={`${zone.label} META4PRO`} width="1600" height="1067" decoding="async" />
            <figcaption>
              <span>{zone.seats} · {zone.room}</span>
              <strong>{zone.line}</strong>
            </figcaption>
          </figure>

          <div className="zone-specs" aria-label={`Характеристики ${zone.name}`}>
            <div><span>Процессор</span><b>{zone.cpu}</b></div>
            <div><span>Видеокарта</span><b>{zone.gpu}</b></div>
            <div><span>Память</span><b>{zone.memory}</b></div>
            <div><span>Монитор</span><b>{zone.hz}</b></div>
          </div>

          <div className="zone-panel-footer">
            <p>{zone.gear}</p>
            <button className="button button-ink" type="button" onClick={chooseAndBook}>
              Забронировать {zone.name} <ArrowUpRight aria-hidden="true" />
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
