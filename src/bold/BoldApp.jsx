import { useState } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { club, galleryItems, zones } from '../data/clubData';
import ZoneOrbitScene from './ZoneOrbitScene';

const asset = file => `${import.meta.env.BASE_URL}assets/${file}`;

const tariffs = [
  { id: 'hour', label: '1 час', note: 'Почасовая игра' },
  { id: 'three', label: '3+1', note: 'Четыре часа игры' },
  { id: 'five', label: '5+1', note: 'Шесть часов игры' },
  { id: 'night', label: 'Ночь', note: 'С 21:00 до 05:00' }
];

const prices = {
  general: { hour: 85, three: 229, five: 359, night: 299 },
  arena: { hour: 105, three: 299, five: 459, night: 399 },
  bootcamp: { hour: 135, three: 359, five: 549, night: 549 },
  sigma: { hour: 189, three: 499, five: 679, night: 749 }
};

const devices = [
  {
    id: 'mouse',
    title: 'Мыши',
    image: asset('device-mouse.webp'),
    from: 50,
    items: [
      ['Lunacy One', 200, 100],
      ['Logitech G Pro X Superlight 2 SE', 200, 100],
      ['IO by Red Square Airox SE', 100, 50],
      ['Mchose A5 V3', 100, 50],
      ['LAMZU Atlantis V2 Nordic MCU 4K', 200, 100]
    ]
  },
  {
    id: 'keyboard',
    title: 'Клавиатуры',
    image: asset('device-keyboard.webp'),
    from: 50,
    items: [
      ['Dark Project KD87A LTD', 200, 100],
      ['Ajazz AK980', 150, 75],
      ['Ajazz AK820 Pro', 100, 50],
      ['IO by Red Square Type 68 SE', 100, 50]
    ]
  },
  {
    id: 'headset',
    title: 'Наушники',
    image: asset('device-headset.webp'),
    from: 50,
    items: [
      ['Lunacy Louder', 200, 100],
      ['Logitech G Pro X 2 Lightspeed', 200, 100],
      ['IO by Red Square Graphite 2 Pro', 100, 50],
      ['Logitech G435', 100, 50]
    ]
  },
  {
    id: 'accessories',
    title: 'Аксессуары',
    image: asset('device-accessories.webp'),
    from: 50,
    items: [
      ['Стримпад Ajazz AKP153R', 150, 75],
      ['Коврик ARDOR GAMING Glass', 100, 50]
    ]
  }
];

const reviews = [
  ['«Железо мощное, посадка комфортная. Админы разбираются в своём деле, есть шкафчики для вещей».', 'ctak4', 'Google Карты', 'https://g.page/Meta4Pro?share='],
  ['«Уютная обстановка, хорошее железо и сотрудники, которые общаются с игроками на одной волне».', 'Аикоо Сан', 'Яндекс Карты', 'https://yandex.ru/maps/-/CCUqYMCv8C'],
  ['«Удобные кресла, всё чисто. Железо отличное — рекомендую».', 'Иван Надточиев', '2ГИС', 'https://go.2gis.com/m5bzt'],
  ['«Крутое место! Хорошая атмосфера, отличные компьютеры и персонал, который разбирается в играх».', 'Влад', 'Яндекс Карты', 'https://yandex.ru/maps/-/CCUqYMCv8C'],
  ['«Всё на высшем уровне: атмосфера, вежливый персонал, топовые девайсы, турниры и акции».', 'Миша Колодко', 'VK', 'https://vk.com/meta4pro'],
  ['«Топовое железо, есть снеки, сотрудники всегда помогут и всё расскажут».', 'Александр Новосёлов', '2ГИС', 'https://go.2gis.com/m5bzt']
];

const faq = [
  ['Можно прийти без брони?', 'Да. Но вечером, в выходные и праздники мест меньше. Если нужна конкретная зона, несколько ПК рядом или закрытая комната, лучше позвонить заранее.'],
  ['Чем отличаются четыре зоны?', 'Общий зал и Арена открытые. Bootcamp и Sigma Room — отдельные комнаты на шесть человек. Железо, мониторы и девайсы указаны в описании каждой зоны.'],
  ['Как забронировать компьютер?', 'Позвони администратору или напиши в Telegram. Он поможет выбрать время, зону и места рядом.'],
  ['Как можно оплатить игру?', 'Банковской картой или по СБП через QR-код. Баланс аккаунта можно пополнить с игрового компьютера.'],
  ['Можно со своими девайсами?', 'Да. Можно подключить свою мышь, клавиатуру и наушники или арендовать другой девайс на игровую сессию.'],
  ['Есть ночные игровые сессии?', 'Да. Клуб работает круглосуточно, ночной пакет действует с 21:00 до 05:00.']
];

function handleTabKey(event, index, count, onChange) {
  const next = {
    ArrowRight: (index + 1) % count,
    ArrowDown: (index + 1) % count,
    ArrowLeft: (index - 1 + count) % count,
    ArrowUp: (index - 1 + count) % count,
    Home: 0,
    End: count - 1
  }[event.key];

  if (next === undefined) return;
  event.preventDefault();
  onChange(next);
  event.currentTarget.parentElement?.children[next]?.focus();
}

export default function BoldApp() {
  const [activeZone, setActiveZone] = useState(0);
  const [activeTariff, setActiveTariff] = useState(0);
  const [safeOpen, setSafeOpen] = useState(false);
  const selectedZone = zones[activeZone];
  const selectedTariff = tariffs[activeTariff];
  const telegramMessage = encodeURIComponent(`Здравствуйте! Хочу забронировать место в зоне ${selectedZone.name}. Подскажите свободное время.`);
  const telegramUrl = `${club.telegram}?text=${telegramMessage}`;

  return (
    <div className="bold-app" id="top">
      <a className="bold-skip" href="#content">К основному содержанию</a>

      <header className="bold-hero">
        <nav className="bold-nav" aria-label="Основная навигация">
          <a className="bold-logo" href="#top" aria-label="META4PRO — на главную">META<span>4</span>PRO <small>ROSTOV</small></a>
          <div className="bold-nav-links">
            <a href="#zones">Зоны</a>
            <a href="#prices">Цены</a>
            <a href="#booking">Бронь</a>
          </div>
          <a className="bold-phone" href={club.phoneHref}>{club.phone}</a>
        </nav>

        <div className="bold-hero-lockup">
          <div className="bold-hero-title">
            <h1>ВЫБЕРИ<br /><span>СВОЮ</span><br />ЗОНУ.</h1>
            <p>36 игровых ПК и четыре зоны на Нагибина. Работаем круглосуточно.</p>
          </div>

          <div className="bold-hero-stage m4-cut" aria-label="Интерактивный выбор игровых зон">
            <ZoneOrbitScene zones={zones} activeIndex={activeZone} onActiveChange={setActiveZone} />
            <div className="bold-scene-zone" aria-live="polite">
              <span>{selectedZone.label}</span>
              <strong>{selectedZone.name}</strong>
              <b>от {selectedZone.price} ₽/ч</b>
            </div>
          </div>

          <div className="bold-hero-actions">
            <a className="bold-action m4-cut" href="#zones">Сравнить зоны <ArrowDownRight aria-hidden="true" /></a>
            <a className="bold-text-link" href="#booking">Забронировать место</a>
          </div>
        </div>
      </header>

      <div className="bold-signal-tape" aria-label="36 игровых компьютеров, 4 зоны, работаем 24 часа в сутки, Нагибина 43/4">
        <p aria-hidden="true">36 ПК / 4 ЗОНЫ / 24/7 / НАГИБИНА 43/4 / 36 ПК / 4 ЗОНЫ / 24/7 / НАГИБИНА 43/4</p>
      </div>

      <main id="content">
        <section className="bold-section bold-zones" id="zones" aria-labelledby="zones-title">
          <header className="bold-section-head">
            <h2 id="zones-title">ЧЕТЫРЕ<br />РЕЖИМА ИГРЫ.</h2>
            <p>От доступного общего зала до приватной Sigma Room. Выбирай по цене, железу и формату компании.</p>
          </header>

          <div className="bold-zone-accordion">
            {zones.map((zone, index) => {
              const isActive = index === activeZone;
              return (
                <article className={`bold-zone ${isActive ? 'is-active m4-cut' : ''}`} key={zone.id}>
                  <button
                    className="bold-zone-trigger"
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={`bold-zone-panel-${zone.id}`}
                    onClick={() => setActiveZone(index)}
                  >
                    <span><strong>{zone.name}</strong><small>{zone.label}</small></span>
                    <span>{zone.seats}</span>
                    <b>от {zone.price} ₽/ч</b>
                  </button>

                  <div className="bold-zone-panel" id={`bold-zone-panel-${zone.id}`} hidden={!isActive}>
                    <figure>
                      <img src={zone.image} alt={`${zone.label} META4PRO`} width="1600" height="1067" loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
                      <figcaption>{zone.line}</figcaption>
                    </figure>
                    <div className="bold-zone-specs">
                      <div><span>Процессор</span><strong>{zone.cpu}</strong></div>
                      <div><span>Видеокарта</span><strong>{zone.gpu}</strong></div>
                      <div><span>Память</span><strong>{zone.memory}</strong></div>
                      <div><span>Монитор</span><strong>{zone.hz}</strong></div>
                      <p>{zone.gear}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="bold-section bold-club" aria-labelledby="club-title">
          <header className="bold-section-head">
            <h2 id="club-title">ВНУТРИ<br />META4PRO.</h2>
            <p>Реальные залы, закрытые комнаты, игровые места и бар.</p>
          </header>
          <div className="bold-photo-strip" tabIndex="0" aria-label="Фотографии клуба META4PRO">
            {galleryItems.map((item, index) => (
              <figure className={`bold-photo bold-photo--${index % 3}`} key={`${item.image}-${index}`}>
                <img src={item.image} alt={item.text} width="1600" height="1067" loading="lazy" decoding="async" />
                <figcaption>{item.text}</figcaption>
              </figure>
            ))}
          </div>
          <div className="bold-club-statement">
            <strong>СВОЯ КОМНАТА.</strong>
            <p>Bootcamp и Sigma Room — по шесть мест без посторонних. В клубе есть шкафчики и бар.</p>
          </div>
        </section>

        <section className="bold-section bold-prices" id="prices" aria-labelledby="prices-title">
          <header className="bold-section-head bold-section-head--ink">
            <h2 id="prices-title">ЦЕНЫ<br />БЕЗ МЕЛКОГО ШРИФТА.</h2>
            <p>Почасово, пакеты с бонусным часом или ночь с 21:00 до 05:00.</p>
          </header>

          <div className="bold-tariff-tabs" role="tablist" aria-label="Варианты тарифа">
            {tariffs.map((tariff, index) => (
              <button
                key={tariff.id}
                className={index === activeTariff ? 'is-active m4-cut' : ''}
                id={`tariff-tab-${tariff.id}`}
                type="button"
                role="tab"
                aria-selected={index === activeTariff}
                aria-controls="tariff-panel"
                tabIndex={index === activeTariff ? 0 : -1}
                onClick={() => setActiveTariff(index)}
                onKeyDown={event => handleTabKey(event, index, tariffs.length, setActiveTariff)}
              >
                {tariff.label}
              </button>
            ))}
          </div>

          <div className="bold-price-board" id="tariff-panel" role="tabpanel" aria-labelledby={`tariff-tab-${selectedTariff.id}`} tabIndex="0">
            <p className="bold-tariff-note">{selectedTariff.note}</p>
            <div role="table" aria-label={`Цены: ${selectedTariff.label}`}>
              {zones.map(zone => (
                <div className="bold-price-row" role="row" key={zone.id}>
                  <div role="rowheader"><strong>{zone.name}</strong><span>{zone.label}</span></div>
                  <b role="cell">{prices[zone.id][selectedTariff.id]} <small>₽</small></b>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bold-section bold-rental" id="rental" aria-labelledby="rental-title">
          <header className="bold-section-head">
            <h2 id="rental-title">ДЕВАЙСЫ<br />НА СЕССИЮ.</h2>
            <p>Мыши, клавиатуры, наушники и аксессуары можно взять на время игры. Сейчас действует скидка 50%.</p>
          </header>

          <div className="bold-device-rail">
            {devices.map(device => (
              <article className="bold-device" key={device.id}>
                <div className="bold-device-top">
                  <h3>{device.title}</h3>
                  <strong>от {device.from} ₽</strong>
                </div>
                <img src={device.image} alt={`${device.title} в аренду`} width="1200" height="800" loading="lazy" decoding="async" />
                <ul>
                  {device.items.map(([name, oldPrice, newPrice]) => (
                    <li key={name}><span>{name}</span><b><del>{oldPrice} ₽</del>{newPrice} ₽</b></li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <a className="bold-text-link" href={club.phoneHref}>Уточнить наличие</a>
        </section>

        <section className="bold-section bold-bonuses" id="bonuses" aria-labelledby="bonuses-title">
          <header className="bold-section-head">
            <h2 id="bonuses-title">БОНУСЫ<br />В ИГРЕ.</h2>
            <p>Основные акции клуба. Условия могут меняться — детали подскажет администратор.</p>
          </header>

          <div className="bold-poster-grid">
            <article className="bold-poster bold-poster--welcome">
              <strong>500 ₽</strong><div><h3>Новым гостям</h3><p>Бонус на баланс при первом посещении.</p></div>
            </article>
            <article className="bold-poster bold-poster--friend">
              <strong>100%</strong><div><h3>За друга</h3><p>Начислим сумму его пополнения на твой баланс.</p></div>
            </article>
            <button
              className="bold-poster bold-poster--safe m4-cut"
              type="button"
              aria-expanded={safeOpen}
              onClick={() => setSafeOpen(value => !value)}
            >
              <strong>{safeOpen ? 'от 600 ₽' : '×2'}</strong>
              <div><h3>Сейф</h3><p>{safeOpen ? 'Угадай код сейфа и удвой сумму пополнения.' : 'Открыть условия'}</p></div>
            </button>
            <article className="bold-poster bold-poster--taxi">
              <strong>400 ₽</strong><div><h3>Такси до клуба</h3><p>Вернём до 400 ₽ за поездку при пополнении от 500 ₽.</p></div>
            </article>
            <div className="bold-discounts">
              <article><strong>−25%</strong><span>Школьникам по дневнику</span></article>
              <article><strong>−20%</strong><span>Студентам и курсантам по документу</span></article>
            </div>
          </div>
        </section>

        <section className="bold-section bold-reviews" aria-labelledby="reviews-title">
          <header className="bold-section-head">
            <h2 id="reviews-title">ГОСТИ<br />ГОВОРЯТ ПРЯМО.</h2>
            <p>Отзывы с Google Карт, Яндекс Карт, 2ГИС и VK.</p>
          </header>
          <div className="bold-review-rail">
            {reviews.map(([quote, name, source, href]) => (
              <figure className="bold-review" key={`${name}-${source}`}>
                <blockquote>{quote}</blockquote>
                <figcaption><strong>{name}</strong><a href={href} target="_blank" rel="noreferrer">{source}<ArrowUpRight aria-hidden="true" /></a></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="bold-closing" id="booking" aria-labelledby="booking-title">
          <div className="bold-booking">
            <h2 id="booking-title">ЗАБРОНИРУЙ<br />СВОЁ МЕСТО.</h2>
            <p>Сейчас выбрана зона <strong>{selectedZone.name}</strong> — от {selectedZone.price} ₽ в час. Администратор проверит свободные места и подтвердит бронь.</p>
            <div className="bold-booking-actions">
              <a className="bold-final-cta m4-cut" href={telegramUrl} target="_blank" rel="noreferrer">Написать в Telegram <ArrowUpRight aria-hidden="true" /></a>
              <a className="bold-text-link" href={club.phoneHref}>Позвонить {club.phone}</a>
            </div>
            <address>{club.city}<br /><strong>{club.address}</strong><br />Работаем 24/7</address>
          </div>

          <div className="bold-faq" id="faq">
            <h2>ОТВЕТЫ НА ВОПРОСЫ.</h2>
            {faq.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="bold-footer">
        <a className="bold-logo" href="#top">META<span>4</span>PRO</a>
        <p>Компьютерный клуб в Ростове-на-Дону</p>
        <small>© 2020–2026 META4PRO BOOTCAMP</small>
      </footer>
    </div>
  );
}
