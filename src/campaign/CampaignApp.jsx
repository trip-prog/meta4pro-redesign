/*
THESIS: META4PRO is a playable campaign poster, not a polite catalogue of gaming PCs.
OWN-WORLD: black club photography, signal-yellow and gold fields, warm white highlights, black-gold chrome and chamfered plates.
STORY: choose one of four real zones, compare exact prices and hardware, see the club, then contact the administrator.
FIRST VIEWPORT: full-bleed club photo, compressed yellow/white title, touch-reactive acrylic MP mark, fact rail and one booking action.
FORM: user-pinned seven-block yellow-black campaign comps, seed user-pinned-yellow-black-2026-08-25; semantic React reconstruction, never screenshot wallpaper.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
*/

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Phone,
  Send
} from 'lucide-react';
import { club, galleryItems, zones } from '../data/clubData';

const asset = file => `${import.meta.env.BASE_URL}assets/${file}`;

const tariffs = [
  { id: 'hour', label: 'Час', note: 'Почасовая игра' },
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
  ['Железо мощное, посадка комфортная. Админы разбираются в своём деле, есть шкафчики для вещей.', 'ctak4', 'Google Карты', 'https://g.page/Meta4Pro?share='],
  ['Уютная обстановка, хорошее железо и сотрудники, которые общаются с игроками на одной волне.', 'Аикоо Сан', 'Яндекс Карты', 'https://yandex.ru/maps/-/CCUqYMCv8C'],
  ['Удобные кресла, всё чисто. Железо отличное — рекомендую.', 'Иван Надточиев', '2ГИС', 'https://go.2gis.com/m5bzt'],
  ['Крутое место! Хорошая атмосфера, отличные компьютеры и персонал, который разбирается в играх.', 'Влад', 'Яндекс Карты', 'https://yandex.ru/maps/-/CCUqYMCv8C'],
  ['Всё на высшем уровне: атмосфера, вежливый персонал, топовые девайсы, турниры и акции.', 'Миша Колодко', 'VK', 'https://vk.com/meta4pro'],
  ['Топовое железо, есть снеки, сотрудники всегда помогут и всё расскажут.', 'Александр Новосёлов', '2ГИС', 'https://go.2gis.com/m5bzt']
];

const faq = [
  ['Можно прийти без брони?', 'Да. Но вечером, в выходные и праздники мест меньше. Для конкретной зоны, нескольких ПК рядом или отдельной комнаты лучше позвонить заранее.'],
  ['Чем отличаются четыре зоны?', 'GENERAL и ARENA — открытые залы. BOOTCAMP и SIGMA — отдельные комнаты на шесть человек. Железо и мониторы указаны в каждой зоне.'],
  ['Как забронировать компьютер?', 'Позвони администратору или напиши в Telegram. Он поможет выбрать время, зону и места рядом.'],
  ['Как можно оплатить игру?', 'Банковской картой или по СБП через QR-код. Баланс аккаунта можно пополнить с игрового компьютера.'],
  ['Можно со своими девайсами?', 'Да. Можно подключить свою мышь, клавиатуру и наушники или арендовать другой девайс на игровую сессию.'],
  ['Есть ночные игровые сессии?', 'Да. Клуб работает круглосуточно, ночной пакет действует с 21:00 до 05:00.']
];

const railSections = [
  ['campaign-hero', 'Старт'],
  ['zones', 'Зоны'],
  ['prices', 'Цены'],
  ['rental', 'Аренда'],
  ['booking', 'Бронь']
];

function AcrylicFour({ className = '', eager = false }) {
  return (
    <div className={`campaign-four ${className}`} aria-hidden="true">
      <img src={asset('campaign/meta4pro-mp-electric-gold.webp')} alt="" width="1024" height="1024" loading={eager ? 'eager' : 'lazy'} decoding="async" />
    </div>
  );
}

function Bolt({ className = '', eager = false }) {
  return (
    <img className={`campaign-bolt ${className}`} src={asset('campaign/meta4pro-lightning-gold.webp')} alt="" width="420" height="736" loading={eager ? 'eager' : 'lazy'} decoding="async" aria-hidden="true" />
  );
}

function ChromeBlob({ className = '', eager = false }) {
  return <img className={`campaign-chrome ${className}`} src={asset('campaign/meta4pro-chrome-blob-gold.webp')} alt="" width="720" height="480" loading={eager ? 'eager' : 'lazy'} decoding="async" aria-hidden="true" />;
}

const bonusAssets = {
  friend: asset('campaign/bonus-friend-gold.webp'),
  safe: asset('campaign/bonus-safe-gold.webp'),
  taxi: asset('campaign/bonus-taxi-gold.webp'),
  school: asset('campaign/bonus-school-backpack-gold.webp'),
  student: asset('campaign/bonus-student-cap-gold.webp')
};

function keyboardTabs(event, index, length, setIndex) {
  const next = {
    ArrowRight: (index + 1) % length,
    ArrowDown: (index + 1) % length,
    ArrowLeft: (index - 1 + length) % length,
    ArrowUp: (index - 1 + length) % length,
    Home: 0,
    End: length - 1
  }[event.key];

  if (next === undefined) return;
  event.preventDefault();
  setIndex(next);
  event.currentTarget.parentElement?.children[next]?.focus();
}

function useDragRail() {
  const drag = useRef(null);

  const finish = useCallback(event => {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return;
    drag.current = null;
    event.currentTarget.classList.remove('is-dragging');
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }, []);

  return {
    onPointerDown: useCallback(event => {
      if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest?.('a, button')) return;
      drag.current = { pointerId: event.pointerId, x: event.clientX, scrollLeft: event.currentTarget.scrollLeft };
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.classList.add('is-dragging');
    }, []),
    onPointerMove: useCallback(event => {
      if (!drag.current || drag.current.pointerId !== event.pointerId) return;
      event.preventDefault();
      event.currentTarget.scrollLeft = drag.current.scrollLeft - (event.clientX - drag.current.x);
    }, []),
    onPointerUp: finish,
    onPointerCancel: finish,
    onLostPointerCapture: finish
  };
}

export default function CampaignApp() {
  const rootRef = useRef(null);
  const [activeZone, setActiveZone] = useState(0);
  const [activeTariff, setActiveTariff] = useState(0);
  const [activeDevice, setActiveDevice] = useState(0);
  const [activeSection, setActiveSection] = useState('campaign-hero');
  const galleryDrag = useDragRail();
  const reviewDrag = useDragRail();

  const selectedZone = zones[activeZone];
  const selectedTariff = tariffs[activeTariff];
  const selectedDevice = devices[activeDevice];
  const telegramMessage = encodeURIComponent(`Здравствуйте! Хочу забронировать место в зоне ${selectedZone.name}. Подскажите свободное время.`);
  const telegramUrl = `${club.telegram}?text=${telegramMessage}`;

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.find(entry => entry.isIntersecting);
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-35% 0px -55%', threshold: 0 });

    railSections.forEach(([id]) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  const reactToPointer = useCallback(event => {
    const root = rootRef.current;
    if (!root || typeof window === 'undefined') return;
    if (event.type === 'pointermove' && event.pointerType !== 'mouse') return;
    const x = Math.max(-0.5, Math.min(0.5, event.clientX / Math.max(window.innerWidth, 1) - 0.5));
    const y = Math.max(-0.5, Math.min(0.5, event.clientY / Math.max(window.innerHeight, 1) - 0.5));
    root.style.setProperty('--pointer-x', x.toFixed(3));
    root.style.setProperty('--pointer-y', y.toFixed(3));
    root.style.setProperty('--pointer-glow-x', `${((x + 0.5) * 100).toFixed(1)}%`);
    root.style.setProperty('--pointer-glow-y', `${((y + 0.5) * 100).toFixed(1)}%`);
    root.style.setProperty('--tilt-x', `${(y * -10).toFixed(2)}deg`);
    root.style.setProperty('--tilt-y', `${(x * 14).toFixed(2)}deg`);
    root.style.setProperty('--shift-x', `${(x * 28).toFixed(2)}px`);
    root.style.setProperty('--shift-y', `${(y * 20).toFixed(2)}px`);
    root.style.setProperty('--shift-soft-x', `${(x * 14).toFixed(2)}px`);
    root.style.setProperty('--shift-soft-y', `${(y * 10).toFixed(2)}px`);
    root.style.setProperty('--shift-reverse-x', `${(x * -18).toFixed(2)}px`);
    root.style.setProperty('--shift-reverse-y', `${(y * -12).toFixed(2)}px`);
  }, []);

  return (
    <div className="campaign-app" id="top" ref={rootRef} onPointerDown={reactToPointer} onPointerMove={reactToPointer}>
      <a className="campaign-skip" href="#campaign-main">К основному содержанию</a>

      <header className="campaign-header">
        <a className="campaign-brand" href="#top" aria-label="META4PRO — в начало страницы">
          <img src={asset('campaign/meta4pro-mp-electric-gold.webp')} alt="" width="40" height="40" />
          <span>META<b>4</b>PRO</span>
        </a>

        <nav className="campaign-nav" id="campaign-navigation" aria-label="Основная навигация">
          <a href="#zones">Зоны</a>
          <a href="#prices">Цены</a>
          <a href="#rental">Аренда</a>
          <a href="#bonuses">Бонусы</a>
          <a href="#booking">Бронь</a>
        </nav>

        <a className="campaign-header-phone" href={club.phoneHref}>{club.phone}</a>
      </header>

      <nav className="campaign-match-rail" aria-label="Быстрая навигация">
        {railSections.map(([id, label]) => (
          <a href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined} key={id}>
            <i aria-hidden="true" />
            <span>{label}</span>
          </a>
        ))}
      </nav>

      <main id="campaign-main">
        <section className="campaign-hero" id="campaign-hero" aria-labelledby="campaign-hero-title">
          <img className="campaign-hero-photo" src={zones[1].image} alt="Игровой зал ARENA в META4PRO" width="1600" height="1068" fetchPriority="high" />
          <div className="campaign-hero-shade" aria-hidden="true" />
          <Bolt className="campaign-hero-bolt" eager />
          <Bolt className="campaign-hero-bolt-secondary" eager />
          <ChromeBlob className="campaign-chrome--hero" eager />
          <ChromeBlob className="campaign-chrome--hero-secondary" eager />

          <div className="campaign-hero-copy">
            <h1 className="campaign-display" id="campaign-hero-title">
              <span>ВЫБЕРИ</span>
              <span>СВОЮ ЗОНУ</span>
            </h1>
            <p>Четыре формата игры — от общего зала до приватной SIGMA. На Нагибина, круглосуточно.</p>
          </div>

          <AcrylicFour className="campaign-four--hero" eager />

          <div className="campaign-hero-actions">
            <div className="campaign-facts campaign-plate" aria-label="36 игровых компьютеров, 4 зоны, клуб работает круглосуточно">
              <span><b>36</b> ПК</span>
              <i aria-hidden="true" />
              <span><b>4</b> зоны</span>
              <i aria-hidden="true" />
              <span><b>24/7</b></span>
            </div>
            <a className="campaign-cta campaign-plate" href="#booking">Забронировать <ArrowDown aria-hidden="true" /></a>
          </div>
        </section>

        <section className="campaign-zones campaign-section" id="zones" aria-labelledby="campaign-zones-title">
          <Bolt className="campaign-zones-bolt" />
          <div className="campaign-section-heading">
            <h2 className="campaign-display" id="campaign-zones-title">ЧЕТЫРЕ ЗОНЫ</h2>
            <p>Выбери цену, мощность и формат — характеристики каждого места собраны здесь.</p>
          </div>

          <div className="campaign-zone-stack">
            {zones.map((zone, index) => {
              const selected = activeZone === index;
              return (
                <article className={selected ? 'campaign-zone campaign-plate is-active' : 'campaign-zone campaign-plate'} key={zone.id}>
                  <button
                    type="button"
                    className="campaign-zone-control"
                    aria-expanded={selected}
                    aria-controls={`campaign-zone-${zone.id}`}
                    onClick={() => setActiveZone(index)}
                  >
                    <img src={zone.image} alt="" width="1600" height={index < 2 ? '1068' : '1066'} loading="lazy" decoding="async" draggable="false" />
                    <span className="campaign-zone-name">{zone.name}</span>
                    <span className="campaign-zone-price"><small>от</small>{zone.price}<small>₽/ч</small></span>
                  </button>

                  <div className={selected ? 'campaign-zone-specs is-open' : 'campaign-zone-specs'} id={`campaign-zone-${zone.id}`} aria-hidden={!selected}>
                    <span><small>{zone.seats}</small><strong>{zone.room}</strong></span>
                    <span><small>Процессор</small><strong>{zone.cpu}</strong></span>
                    <span><small>Графика</small><strong>{zone.gpu}</strong></span>
                    <span><small>Экран</small><strong>{zone.hz}</strong></span>
                    <span><small>Память</small><strong>{zone.memory}</strong></span>
                    <span><small>Девайсы</small><strong>{zone.gear}</strong></span>
                  </div>
                </article>
              );
            })}
          </div>

        </section>

        <section className="campaign-atmosphere campaign-section" aria-labelledby="campaign-atmosphere-title">
          <Bolt className="campaign-atmosphere-bolt" />
          <h2 className="campaign-display" id="campaign-atmosphere-title"><span>ВНУТРИ</span><span>META4PRO</span></h2>

          <div className="campaign-gallery-rail" tabIndex="0" aria-label="Фотографии клуба META4PRO" {...galleryDrag}>
            {galleryItems.slice(0, -1).map((item, index) => (
              <figure className={`campaign-gallery-card campaign-gallery-card--${index % 3} campaign-plate`} key={`${item.image}-${index}`}>
                <img src={item.image} alt={item.text} width="1600" height="1067" loading="lazy" decoding="async" draggable="false" />
                <figcaption>{item.text}</figcaption>
              </figure>
            ))}
          </div>

          <div className="campaign-clock campaign-plate"><strong>24/7</strong><span>работаем круглосуточно</span></div>

          <div className="campaign-benefits">
            <div className="campaign-benefit campaign-plate"><strong>Своя комната</strong><span>BOOTCAMP и SIGMA — по шесть мест без посторонних</span></div>
            <div className="campaign-benefit campaign-plate"><strong>Бар и шкафчики</strong><span>Перерыв между матчами и место для вещей</span></div>
          </div>
        </section>

        <section className="campaign-prices campaign-section" id="prices" aria-labelledby="campaign-prices-title">
          <Bolt className="campaign-prices-bolt" />
          <div className="campaign-section-heading">
            <h2 className="campaign-display" id="campaign-prices-title">ЦЕНЫ</h2>
            <p>Выбери формат сессии — таблица сразу покажет стоимость во всех зонах.</p>
          </div>

          <div className="campaign-tariffs" role="tablist" aria-label="Тарифы">
            {tariffs.map((tariff, index) => (
              <button
                key={tariff.id}
                type="button"
                role="tab"
                id={`campaign-tariff-${tariff.id}`}
                aria-selected={activeTariff === index}
                aria-controls="campaign-price-panel"
                tabIndex={activeTariff === index ? 0 : -1}
                className={activeTariff === index ? 'campaign-plate is-active' : 'campaign-plate'}
                onClick={() => setActiveTariff(index)}
                onKeyDown={event => keyboardTabs(event, index, tariffs.length, setActiveTariff)}
              >
                {tariff.label}
              </button>
            ))}
          </div>

          <div className="campaign-price-panel" id="campaign-price-panel" role="tabpanel" aria-labelledby={`campaign-tariff-${selectedTariff.id}`} tabIndex="0">
            <p>{selectedTariff.note}</p>
            <div role="table" aria-label={`Цены по тарифу ${selectedTariff.label}`}>
              {zones.map(zone => (
                <div className="campaign-price-row campaign-plate" role="row" key={zone.id}>
                  <strong role="rowheader">{zone.name}</strong>
                  <b role="cell">{prices[zone.id][selectedTariff.id]} <small>₽</small></b>
                </div>
              ))}
            </div>
          </div>

          <a className="campaign-cta campaign-plate campaign-prices-cta" href="#booking">Выбрать зону <ArrowRight aria-hidden="true" /></a>
        </section>

        <section className="campaign-rental campaign-section" id="rental" aria-labelledby="campaign-rental-title">
          <div className="campaign-section-heading">
            <h2 className="campaign-display" id="campaign-rental-title"><span>АРЕНДА</span><span>ДЕВАЙСОВ</span></h2>
            <p>Можно подключить свои девайсы или взять другие на игровую сессию. Сейчас на каталог действует скидка 50%.</p>
          </div>
          <Bolt className="campaign-rental-bolt" />
          <ChromeBlob className="campaign-chrome--rental" />

          <div className="campaign-device-tabs" role="tablist" aria-label="Категории устройств">
            {devices.map((device, index) => (
              <button
                key={device.id}
                type="button"
                role="tab"
                id={`campaign-device-${device.id}`}
                aria-selected={activeDevice === index}
                aria-controls="campaign-device-panel"
                tabIndex={activeDevice === index ? 0 : -1}
                className={activeDevice === index ? 'campaign-plate is-active' : 'campaign-plate'}
                onClick={() => setActiveDevice(index)}
                onKeyDown={event => keyboardTabs(event, index, devices.length, setActiveDevice)}
              >
                <img src={device.image} alt="" width="1024" height="1024" loading="lazy" decoding="async" />
                <span>{device.title}</span>
                <small>от {device.from} ₽</small>
              </button>
            ))}
          </div>

          <div className="campaign-device-stage campaign-plate" id="campaign-device-panel" role="tabpanel" aria-labelledby={`campaign-device-${selectedDevice.id}`} tabIndex="0">
            <div className="campaign-device-visual">
              <img src={selectedDevice.image} alt={`${selectedDevice.title} в аренду`} width="1024" height="1024" loading="lazy" decoding="async" />
              <strong><small>от</small>{selectedDevice.from}<small>₽</small></strong>
            </div>
            <ul>
              {selectedDevice.items.map(([name, oldPrice, currentPrice]) => (
                <li key={name}>
                  <span>{name}</span>
                  <b><del>{oldPrice} ₽</del>{currentPrice} ₽</b>
                </li>
              ))}
            </ul>
          </div>

          <a className="campaign-cta campaign-plate campaign-rental-cta" href={club.phoneHref}>Узнать наличие <Phone aria-hidden="true" /></a>
        </section>

        <section className="campaign-bonuses campaign-section" id="bonuses" aria-labelledby="campaign-bonuses-title">
          <Bolt className="campaign-bonuses-bolt" />
          <div className="campaign-section-heading">
            <h2 className="campaign-display" id="campaign-bonuses-title">БОНУСЫ</h2>
            <p>Условия акций могут меняться. Перед визитом уточни детали у администратора.</p>
          </div>

          <div className="campaign-bonus-field">
            <article className="campaign-bonus campaign-bonus--welcome campaign-plate">
              <div className="campaign-bonus-welcome-brand" aria-hidden="true">
                <img src={asset('campaign/meta4pro-mp-electric-gold.webp')} alt="" width="32" height="32" />
                <span>META<b>4</b>PRO</span>
              </div>
              <img className="campaign-bonus-welcome-emblem" src={asset('campaign/meta4pro-mp-electric-gold.webp')} alt="" width="1024" height="1024" loading="lazy" decoding="async" />
              <strong>500 ₽</strong>
              <div><h3>Новым гостям</h3><p>Бонус на игровой баланс при первом посещении.</p></div>
            </article>
            <article className="campaign-bonus campaign-bonus--friend campaign-plate">
              <img className="campaign-bonus-prop campaign-bonus-prop--friend" src={bonusAssets.friend} alt="" width="520" height="520" loading="lazy" decoding="async" />
              <strong>100%</strong>
              <div><h3>За друга</h3><p>Начислим сумму его пополнения на твой баланс.</p></div>
            </article>
            <article className="campaign-bonus campaign-bonus--safe campaign-plate">
              <img className="campaign-bonus-prop campaign-bonus-prop--safe" src={bonusAssets.safe} alt="" width="530" height="530" loading="lazy" decoding="async" />
              <strong>от 600 ₽</strong>
              <div><h3>Сейф</h3><p>Угадай код сейфа и удвой сумму пополнения.</p></div>
            </article>
            <article className="campaign-bonus campaign-bonus--taxi campaign-plate">
              <img className="campaign-bonus-prop campaign-bonus-prop--taxi" src={bonusAssets.taxi} alt="" width="704" height="520" loading="lazy" decoding="async" />
              <strong>400 ₽</strong>
              <div><h3>Такси до клуба</h3><p>Вернём до 400 ₽ за поездку при пополнении от 500 ₽.</p></div>
            </article>
            <article className="campaign-bonus campaign-bonus--school campaign-plate"><img className="campaign-bonus-prop campaign-bonus-prop--school" src={bonusAssets.school} alt="" width="768" height="768" loading="lazy" decoding="async" /><strong>−25%</strong><div><h3>Школьникам</h3><p>По дневнику.</p></div></article>
            <article className="campaign-bonus campaign-bonus--student campaign-plate"><img className="campaign-bonus-prop campaign-bonus-prop--student" src={bonusAssets.student} alt="" width="768" height="768" loading="lazy" decoding="async" /><strong>−20%</strong><div><h3>Студентам</h3><p>И курсантам по документу.</p></div></article>
          </div>
        </section>

        <section className="campaign-reviews campaign-section" aria-labelledby="campaign-reviews-title">
          <img className="campaign-reviews-photo" src={galleryItems[2].image} alt="Игровой зал META4PRO" width="1600" height="1067" loading="lazy" decoding="async" />
          <div className="campaign-section-heading">
            <h2 className="campaign-display" id="campaign-reviews-title"><span>ГОСТИ</span><span>ГОВОРЯТ</span></h2>
            <p>Отзывы гостей на картах и в социальных сетях.</p>
          </div>

          <div className="campaign-review-rail" tabIndex="0" aria-label="Отзывы гостей" {...reviewDrag}>
            {reviews.map(([quote, name, source, href]) => (
              <figure className="campaign-review campaign-plate" key={`${name}-${source}`}>
                <blockquote>{quote}</blockquote>
                <figcaption>
                  <strong>{name}</strong>
                  <a href={href} target="_blank" rel="noreferrer">{source}<ArrowUpRight aria-hidden="true" /></a>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="campaign-close campaign-section" id="booking" aria-labelledby="campaign-booking-title">
          <Bolt className="campaign-close-bolt" />
          <div className="campaign-faq">
            <h2>Ответы на вопросы</h2>
            {faq.map(([question, answer]) => (
              <details className="campaign-plate" key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>

          <div className="campaign-booking">
            <h2 className="campaign-display" id="campaign-booking-title">ЗАБРОНИРУЙ МЕСТО</h2>
            <p>Выбрана зона <strong>{selectedZone.name}</strong> — от {selectedZone.price} ₽ в час. Администратор проверит свободные места и подтвердит бронь.</p>
            <div className="campaign-booking-actions">
              <a className="campaign-cta campaign-plate" href={club.phoneHref}><Phone aria-hidden="true" />Позвонить</a>
              <a className="campaign-cta campaign-cta--dark campaign-plate" href={telegramUrl} target="_blank" rel="noreferrer"><Send aria-hidden="true" />Telegram</a>
            </div>
            <address>{club.city}<br /><strong>{club.address}</strong><br />Работаем 24/7</address>
          </div>

          <AcrylicFour className="campaign-four--close" />
          <ChromeBlob className="campaign-chrome--close" />
        </section>
      </main>

      <footer className="campaign-footer">
        <a className="campaign-brand" href="#top"><img src={asset('campaign/meta4pro-mp-electric-gold.webp')} alt="" width="40" height="40" /><span>META<b>4</b>PRO</span></a>
        <p>Компьютерный клуб в Ростове-на-Дону</p>
        <small>© 2020–2026 META4PRO BOOTCAMP</small>
      </footer>
    </div>
  );
}
