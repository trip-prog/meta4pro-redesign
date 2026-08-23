const asset = file => `${import.meta.env.BASE_URL}assets/${file}`;

export const club = {
  address: 'пр. Михаила Нагибина, 43/4',
  city: 'Ростов-на-Дону',
  phone: '+7 (918) 555-00-90',
  phoneHref: 'tel:+79185550090',
  telegram: 'https://t.me/Meta4pro1',
  originalSite: 'https://meta4pro.ru/'
};

export const zones = [
  {
    id: 'general',
    name: 'GENERAL',
    label: 'Общий зал',
    price: 85,
    seats: '8 мест',
    room: 'открытый зал',
    hz: '240 Гц IPS',
    cpu: 'i5-12400F / Ryzen 5 5600',
    gpu: 'RTX 3060 Ti',
    memory: '16 ГБ DDR4',
    gear: 'Logitech G102 · Logitech G413 SE TKL',
    image: asset('zone-general.webp'),
    line: 'Зайти на час и сразу в игру.'
  },
  {
    id: 'arena',
    name: 'ARENA',
    label: 'Арена',
    price: 105,
    seats: '16 мест',
    room: 'открытый зал',
    hz: '240 Гц IPS',
    cpu: 'Intel Core i5-12400F',
    gpu: 'RTX 4060 / 3060 Ti',
    memory: '16 ГБ DDR4',
    gear: 'Attack Shark X6 · HyperX Cloud II',
    image: asset('zone-arena.webp'),
    line: 'Больше пространства, тот же быстрый старт.'
  },
  {
    id: 'bootcamp',
    name: 'BOOTCAMP',
    label: 'Комната для команды',
    price: 135,
    seats: '6 мест',
    room: 'закрытый bootcamp',
    hz: '320 Гц IPS',
    cpu: 'Intel Core i5-14400F',
    gpu: 'RTX 4060 Ti',
    memory: '16 ГБ DDR4',
    gear: 'Attack Shark X6 · HyperX Cloud II',
    image: asset('zone-bootcamp.webp'),
    line: 'Собрать стак и закрыть дверь.'
  },
  {
    id: 'sigma',
    name: 'SIGMA',
    label: 'Приватная комната',
    price: 189,
    seats: '6 мест',
    room: 'закрытый bootcamp',
    hz: '400 Гц IPS',
    cpu: 'Intel Core i5-14400F',
    gpu: 'RTX 4060 Ti',
    memory: '16 ГБ DDR5',
    gear: 'Logitech G Pro X Superlight 2 · HyperX Cloud II',
    image: asset('zone-sigma.webp'),
    line: 'Максимальная частота, никого лишнего.'
  }
];

export const galleryItems = [
  { image: asset('gallery-night.webp'), text: 'НОЧНАЯ СМЕНА' },
  { image: asset('zone-sigma.webp'), text: 'SIGMA · 400 ГЦ' },
  { image: asset('gallery-player.webp'), text: 'В ИГРЕ' },
  { image: asset('zone-bootcamp.webp'), text: 'СТАК ИЗ ШЕСТИ' },
  { image: asset('gallery-setup.webp'), text: 'ЖЕЛЕЗО БЛИЗКО' },
  { image: asset('zone-arena.webp'), text: 'ARENA · 16 МЕСТ' },
  { image: asset('gallery-bar.webp'), text: 'БАР НА ПАУЗЕ' },
  { image: asset('zone-general.webp'), text: 'GENERAL · ОТ 85 ₽' }
];
