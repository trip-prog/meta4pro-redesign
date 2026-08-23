import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import BookingSection from './components/BookingSection';
import ClubGallery from './components/ClubGallery';
import HardwareHero from './components/HardwareHero';
import SiteHeader from './components/SiteHeader';
import ZoneExplorer from './components/ZoneExplorer';
import { zones } from './data/clubData';

const facts = [
  ['36', 'игровых ПК'],
  ['400 Гц', 'максимальная частота'],
  ['2', 'закрытых bootcamp'],
  ['24/7', 'без выходных']
];

export default function App() {
  const [selectedZone, setSelectedZone] = useState(0);
  const zone = zones[selectedZone];

  return (
    <div id="top">
      <a className="skip-link" href="#main">К основному содержанию</a>
      <SiteHeader />

      <main id="main">
        <HardwareHero />

        <section className="fact-rail" aria-label="META4PRO в цифрах">
          {facts.map(([value, label]) => (
            <div key={label}><strong>{value}</strong><span>{label}</span></div>
          ))}
        </section>

        <ZoneExplorer selectedIndex={selectedZone} onSelect={setSelectedZone} />

        <section className="team-feature" aria-labelledby="team-title">
          <div className="team-image">
            <img src={zones[2].image} alt="Закрытая комната Bootcamp на шесть игроков" width="1600" height="1067" loading="lazy" decoding="async" />
          </div>
          <div className="team-copy">
            <h2 id="team-title">СОБЕРИ СТАК.<br />ЗАКРОЙ ДВЕРЬ.</h2>
            <p>Тренировка, ночь с друзьями или день рождения — шесть мест в одной комнате без посторонних.</p>
            <button
              className="text-action"
              type="button"
              onClick={() => {
                setSelectedZone(2);
                document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Выбрать Bootcamp <ArrowUpRight aria-hidden="true" />
            </button>
          </div>
        </section>

        <ClubGallery />
        <BookingSection selectedIndex={selectedZone} onSelect={setSelectedZone} />
      </main>

      <footer className="site-footer">
        <a className="site-logo footer-logo" href="#top">META<span>4</span>PRO</a>
        <p>Компьютерный клуб в Ростове-на-Дону</p>
        <small>© 2020–2026 META4PRO BOOTCAMP</small>
      </footer>

      <a className="mobile-sticky-book" href="#booking">
        <span><small>{zone.name}</small> от {zone.price} ₽/ч</span>
        <b>Забронировать <ArrowUpRight aria-hidden="true" /></b>
      </a>
    </div>
  );
}
