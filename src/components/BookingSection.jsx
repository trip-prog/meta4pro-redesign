import { ArrowUpRight, MapPin, MessageCircle, Phone } from 'lucide-react';
import { club, zones } from '../data/clubData';

export default function BookingSection({ selectedIndex, onSelect }) {
  const zone = zones[selectedIndex];
  const mapsUrl = `https://yandex.ru/maps/?text=${encodeURIComponent(`${club.city}, ${club.address}`)}`;

  return (
    <section className="booking-section" id="booking" aria-labelledby="booking-title">
      <div className="booking-copy">
        <h2 id="booking-title">ОДИН ТАП<br />ДО КАТКИ.</h2>
        <p>Выбери режим — администратор подтвердит свободное место и поможет с бронью.</p>
      </div>

      <div className="booking-console">
        <fieldset className="booking-zone-choice">
          <legend>Твоя зона</legend>
          <div>
            {zones.map((item, index) => (
              <button
                key={item.id}
                className={index === selectedIndex ? 'is-active' : ''}
                type="button"
                aria-pressed={index === selectedIndex}
                onClick={() => onSelect(index)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="booking-summary" aria-live="polite">
          <div>
            <span>Выбрано</span>
            <strong>{zone.name}</strong>
          </div>
          <div>
            <span>Стоимость</span>
            <strong>от {zone.price} ₽/ч</strong>
          </div>
        </div>

        <div className="booking-actions">
          <a className="booking-primary" href={club.phoneHref}>
            <Phone aria-hidden="true" /> Позвонить <ArrowUpRight aria-hidden="true" />
          </a>
          <a href={club.telegram} target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" /> Telegram <ArrowUpRight aria-hidden="true" />
          </a>
          <a href={club.originalSite} target="_blank" rel="noreferrer">
            Актуальные тарифы <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="booking-address">
        <MapPin aria-hidden="true" />
        <a href={mapsUrl} target="_blank" rel="noreferrer">
          <span>{club.city}</span>
          <strong>{club.address}</strong>
        </a>
        <span>Клуб работает 24/7</span>
      </div>
    </section>
  );
}
