import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import BookingSection from './components/BookingSection';
import ClubGallery from './components/ClubGallery';
import HardwareHero from './components/HardwareHero';
import SiteHeader from './components/SiteHeader';
import ZoneExplorer from './components/ZoneExplorer';
import { zones } from './data/clubData';

export default function App() {
  const [selectedZone, setSelectedZone] = useState(0);
  const [bookingVisible, setBookingVisible] = useState(false);
  const zone = zones[selectedZone];

  useEffect(() => {
    const bookingActions = document.querySelector('.booking-actions');
    if (!bookingActions || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setBookingVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(bookingActions);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="top">
      <a className="skip-link" href="#main">К основному содержанию</a>
      <SiteHeader />

      <main id="main">
        <HardwareHero />
        <ZoneExplorer selectedIndex={selectedZone} onSelect={setSelectedZone} />
        <ClubGallery />
        <BookingSection selectedIndex={selectedZone} />
      </main>

      <footer className="site-footer">
        <a className="site-logo footer-logo" href="#top">META<span>4</span>PRO</a>
        <p>Компьютерный клуб в Ростове-на-Дону</p>
        <small>© 2020–2026 META4PRO BOOTCAMP</small>
      </footer>

      <a className={`mobile-sticky-book ${bookingVisible ? 'is-hidden' : ''}`} href="#booking" aria-hidden={bookingVisible} tabIndex={bookingVisible ? -1 : 0}>
        <span><small>{zone.name}</small> от {zone.price} ₽/ч</span>
        <b>К брони <ArrowUpRight aria-hidden="true" /></b>
      </a>
    </div>
  );
}
