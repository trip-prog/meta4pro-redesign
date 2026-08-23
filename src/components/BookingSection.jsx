import { ArrowUpRight, MapPin, MessageCircle, Phone } from 'lucide-react';
import { club, zones } from '../data/clubData';

export default function BookingSection({ selectedIndex }) {
  const zone = zones[selectedIndex];
  const mapsUrl = `https://yandex.ru/maps/?text=${encodeURIComponent(`${club.city}, ${club.address}`)}`;
  const telegramMessage = encodeURIComponent(`Здравствуйте! Хочу забронировать место в зоне ${zone.name}. Подскажите свободное время.`);
  const telegramUrl = `${club.telegram}?text=${telegramMessage}`;

  return (
    <section className="booking-section" id="booking" aria-labelledby="booking-title">
      <div className="booking-copy">
        <h2 id="booking-title">БРОНЬ<br />МЕСТА</h2>
        <p>Напиши администратору выбранную зону и время. Он проверит свободные места и подтвердит бронь.</p>
      </div>

      <div className="booking-console">
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

        <a className="booking-change" href="#zones">Изменить зону</a>

        <div className="booking-actions">
          <a className="booking-primary" href={telegramUrl} target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" /> Написать в Telegram <ArrowUpRight aria-hidden="true" />
          </a>
          <a href={club.phoneHref}>
            <Phone aria-hidden="true" /> Позвонить <ArrowUpRight aria-hidden="true" />
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
