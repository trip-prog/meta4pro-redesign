---
name: "META4PRO"
description: "Black Gold Voltage — mobile-first campaign with real club photography, compressed type and reactive gold material."
colors:
  campaign-black: "#010100"
  campaign-black-soft: "#090804"
  campaign-black-raised: "#181714"
  warm-white: "#fefefe"
  muted-metal: "#c6c1b3"
  signal-yellow: "#fdcd05"
  signal-lemon: "#fff200"
  signal-amber: "#ce9100"
  signal-gold: "#e7ab00"
  gold-depth: "#6f4900"
typography:
  display:
    fontFamily: "Oswald Variable, Oswald, sans-serif"
    fontSize: "clamp(4.65rem, 22vw, 11rem)"
    fontWeight: 900
    lineHeight: 0.76
    letterSpacing: "-0.04em"
  display-close:
    fontFamily: "Oswald Variable, Oswald, sans-serif"
    fontSize: "clamp(3.3rem, 16.5vw, 9rem)"
    fontWeight: 900
    lineHeight: 0.76
    letterSpacing: "-0.04em"
  brand:
    fontFamily: "Unbounded Variable, Unbounded, sans-serif"
    fontSize: "clamp(0.9rem, 4vw, 1.2rem)"
    fontWeight: 760
    letterSpacing: "-0.035em"
  action:
    fontFamily: "Onest Variable, Onest, sans-serif"
    fontSize: "clamp(1rem, 5vw, 1.28rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Onest Variable, Onest, sans-serif"
    fontSize: "clamp(0.96rem, 2.2vw, 1.18rem)"
    fontWeight: 590
    lineHeight: 1.55
  label:
    fontFamily: "Onest Variable, Onest, sans-serif"
    fontSize: "0.67rem"
    fontWeight: 760
    lineHeight: 1.2
  scale:
    micro-067: "0.67rem"
    micro-068: "0.68rem"
    caption-076: "0.76rem"
    caption-078: "0.78rem"
    label-080: "0.8rem"
    label-082: "0.82rem"
    copy-086: "0.86rem"
    copy-088: "0.88rem"
    copy-090: "0.9rem"
    copy-095: "0.95rem"
    copy-096: "0.96rem"
    body-100: "1rem"
    body-108: "1.08rem"
    body-110: "1.1rem"
    lead-118: "1.18rem"
    lead-120: "1.2rem"
    action-128: "1.28rem"
    title-130: "1.3rem"
    title-135: "1.35rem"
    quote-170: "1.7rem"
    heading-200: "2rem"
    heading-230: "2.3rem"
    metric-235: "2.35rem"
    heading-260: "2.6rem"
    heading-270: "2.7rem"
    metric-300: "3rem"
    metric-330: "3.3rem"
    metric-340: "3.4rem"
    poster-400: "4rem"
    poster-440: "4.4rem"
    poster-465: "4.65rem"
    poster-500: "5rem"
    poster-525: "5.25rem"
    poster-560: "5.6rem"
    poster-600: "6rem"
    poster-700: "7rem"
    poster-800: "8rem"
    poster-900: "9rem"
    poster-1100: "11rem"
    object-2500: "25rem"
    object-4200: "42rem"
spacing:
  cluster: "10px"
  plate: "24px"
  cta: "17px 24px"
  page: "clamp(18px, 5vw, 72px)"
  section-y: "clamp(86px, 18vw, 190px)"
components:
  campaign-cta:
    backgroundColor: "{colors.signal-yellow}"
    textColor: "{colors.campaign-black}"
    typography: "{typography.action}"
    height: "66px"
    padding: "{spacing.cta}"
  campaign-cta-dark:
    backgroundColor: "{colors.campaign-black-raised}"
    textColor: "{colors.warm-white}"
    typography: "{typography.action}"
    height: "66px"
    padding: "{spacing.cta}"
  campaign-plate:
    backgroundColor: "{colors.campaign-black-raised}"
    textColor: "{colors.warm-white}"
    padding: "{spacing.plate}"
  zone-active:
    backgroundColor: "{colors.campaign-black-soft}"
    textColor: "{colors.warm-white}"
    typography: "{typography.body}"
  tariff-active:
    backgroundColor: "{colors.signal-yellow}"
    textColor: "{colors.campaign-black}"
    height: "60px"
    padding: "12px 5px"
  review-plate:
    backgroundColor: "{colors.signal-yellow}"
    textColor: "{colors.campaign-black}"
    padding: "32px 26px"
---

# Design System: META4PRO

## Overview

**Creative North Star: "Black Gold Voltage"**

META4PRO выглядит как живая рекламная кампания компьютерного клуба: реальная фотография ARENA держит сцену правдивой, а сигнальный жёлтый, золото, тёмный хром и молнии дают ей физическое напряжение. Это не каталог карточек и не интерфейсный glassmorphism.

Главный образ — огромная жёлто-белая типографика рядом с прозрачной объёмной `4`. Хромированные объекты и электрические края усиливают материал, но фон первого экрана остаётся спокойным и не конкурирует с реальной фотографией клуба. Этот файл фиксирует проверенное SHIP-состояние campaign surface.

**Key Characteristics:**

- Реальные фотографии клуба остаются главным доказательством места.
- Основа mobile-first рассчитана на 360–430px; desktop расширяет ту же композицию.
- Oswald ведёт гигантские сообщения, Onest — текст, данные и UI, Unbounded — только бренд.
- Чёрные сцены чередуются с жёлтыми полями и неровными авторскими блоками.
- Прозрачный акрил, хром, молнии и реактивный свет образуют одну среду.

## Colors

Палитра строится на почти абсолютном чёрном и тёплом белом; жёлтый отвечает за сообщение и действие, золото и янтарь — за глубину, края и электрический свет.

### Primary

- **Signal Yellow**: основные слова, выбранные состояния, CTA и крупные поля.
- **Signal Lemon**: горячая кромка электрического градиента и focus-visible.
- **Signal Amber** и **Signal Gold**: тёплая глубина, металлические блики и дальний край свечения.

### Secondary

- **Gold Depth**: тёмная золотая глубина прозрачных объектов и plate.
- **Warm White**: холодный контраст для текста, бликов и хромированных граней.

### Neutral

- **Campaign Black**, **Black Soft** и **Black Raised**: фон страницы, сцен и внутренних поверхностей plate.
- **Warm White**: основной светлый текст и белая половина display-композиций.
- **Muted Metal**: пояснения, вторичные данные и служебный текст.

**The Lit Face Rule.** Сплошная жёлтая грань означает выбранное или кликабельное; золото и янтарь остаются светом и кромкой, а не вторым основным брендом.

## Typography

**Display Font:** Oswald Variable (Oswald, sans-serif fallback)
**Brand Font:** Unbounded Variable (Unbounded, sans-serif fallback)
**Body Font:** Onest Variable (Onest, sans-serif fallback)

**Character:** Oswald даёт сжатый рекламный удар и работает только в огромных uppercase-сообщениях. Onest быстро читается по-русски и несёт весь UI, цены, характеристики и текст; Unbounded сохраняет уникальную форму логотипа.

### Hierarchy

- **Display** (900, `clamp(4.65rem, 22vw, 11rem)`, 0.76): hero и заголовки основных сцен; жёлтый и белый могут делить одну фразу.
- **Display Close** (900, `clamp(3.3rem, 16.5vw, 9rem)`, 0.76): финальный booking headline с более сильным горизонтальным сжатием.
- **Brand** (760, `clamp(0.9rem, 4vw, 1.2rem)`): только META4PRO в header и footer.
- **Action** (900, `clamp(1rem, 5vw, 1.28rem)`, uppercase): CTA и крупные управляющие подписи.
- **Body** (570–620, 0.86–1.18rem, 1.45–1.55): описания и пояснения длиной до 57ch.
- **Data / Metric** (790–900, 1.2–9rem): цены, бонусы, названия зон и ключевые числа; остаётся в Onest.
- **Label** (700–820, 0.67–0.8rem, uppercase): характеристики, вкладки и компактные метаданные.

**The Three-Typeface Rule.** Oswald — кампания, Onest — интерфейс и данные, Unbounded — только знак META4PRO; не возвращать старую Onest-display систему и не расширять Unbounded на заголовки.

## Layout

Система mobile-first: один вертикальный поток, поля страницы `clamp(18px, 5vw, 72px)` и максимальная ширина сцены 1500px. Hero заполняет первый экран реальной фотографией ARENA; заголовок, акриловая `4`, lightning, fact plate и бронь образуют одну наложенную композицию. Ниже семь авторских сцен меняют плотность: порталы зон, свайп-галерея реальных фото, жёлтая таблица цен, аренда, неровное bonus field, горизонтальный review rail и финальная бронь.

Ширины 360–430px являются основным контрольным диапазоном. На touch карточки получают глубину от естественного скролла и свайпа без отдельного нажатия; с 720px раскрываются desktop-навигация и широкие композиции, с 1100px — асимметричное редакционное расширение. Контент и порядок действий не меняются между устройствами.

**The Authored Density Rule.** Не превращать сцены в равномерную сетку одинаковых карточек: каждая секция сохраняет собственный масштаб, перекрытия и ритм.

## Elevation & Depth

Глубина создаётся не обычными карточными тенями, а сочетанием реальной фотографии, прозрачного растра, полной двухпиксельной золотой кромки и направленных drop-shadow. Plate получает чёрную внутреннюю грань и lemon/yellow/amber border; активная зона усиливает золотой glow, а хром и девайсы получают тяжёлую нижнюю тень.

### Shadow Vocabulary

- **Plate Depth** (`drop-shadow(0 18px 26px rgba(0,0,0,.46))` + gold glow): базовое физическое отделение plate.
- **Active Portal** (`drop-shadow(0 22px 34px rgba(0,0,0,.6))` + amber glow): только выбранная зона.
- **Object Weight** (`drop-shadow(0 24px 28px rgba(0,0,0,.72))`): прозрачные девайсы, хром и 3D-объекты.

**The Material Shadow Rule.** Тень должна объяснять вес, прозрачность или активное электрическое состояние; нейтральные floating-card shadows не добавляются.

## Shapes

Главная форма — восьмиугольная chamfered plate с адаптивным срезом `clamp(12px, 3.8vw, 26px)`. Двухпиксельный inset оставляет видимой электрическую границу, а внутреннее fill определяет состояние. Фото-коллаж использует крупные несимметричные polygon crops; круглые формы остаются только у фактических точек-индикаторов.

**The Chamfer Rule.** CTA, зоны, цены, бонусы и отзывы используют срезанные углы; обычные rounded rectangles и универсальные pill-кнопки этому миру не принадлежат.

## Components

### Campaign plate

- **Shape:** общий chamfered polygon с электрическим lemon/yellow/amber контуром и inset fill.
- **State:** переменная внутренней грани меняет материал без смены геометрии.
- **Depth:** одна направленная тень и один цветной glow.

### Buttons

- **Primary:** лимонно-жёлто-янтарная грань, чёрный uppercase Onest, высота не менее 66px.
- **Dark:** та же геометрия на чёрной грани с тёплым белым текстом.
- **Hover / Focus:** подъём на 3px доступен только точному указателю; focus-visible всегда использует 3px Signal Lemon с offset 5px.

### Zone portals

- **Structure:** реальное фото, крупное имя, стартовая цена и раскрываемые характеристики в одном plate.
- **State:** активная зона получает black-gold fill и amber glow; факты остаются текстом, не частью изображения.

### Tabs and price rows

- **Tariffs:** четыре равных chamfered tab; жёлтая грань означает `aria-selected=true`.
- **Device tabs:** горизонтальный scroll-snap rail на mobile и жёлтая нижняя линия активной категории.
- **Price rows:** двухчастная CSS-plate: цельный внешний золотой кант, тёмный внутренний кант и чистая грань, где чёрная зона с жёлтым названием через один диагональный золотой bevel переходит в жёлтую область с чёрной ценой.

### Real-photo rail and reviews

- **Gallery:** семь реальных фотографий в нативном scroll-snap rail с разным масштабом plate и отдельным 24/7 акцентом; swipe на touch и mouse-drag на desktop.
- **Reviews:** горизонтальный scroll-snap rail из жёлтых quote plates с touch swipe и mouse-drag; источник остаётся ссылкой.

### Acrylic objects and motion

- **Objects:** прозрачная 3D `4`, chrome blobs и lightning используются как крупные сценические слои, а не как иконки.
- **Touch motion:** зоны, цены, бонусы и горизонтальные rails меняют глубину от естественного скролла или свайпа; отдельный tap не требуется.
- **Reduced motion:** scroll-linked и pointer-анимации отключаются; смысловой контент и управление остаются неизменными.

### Navigation and booking

- **Navigation:** на mobile компактный правый rail показывает текущий раздел жёлтой раскрытой плашкой; с 720px появляется открытая горизонтальная навигация с телефоном, а с 1100px rail возвращается как desktop-элемент.
- **Booking:** финальный блок повторяет выбранную зону и даёт два реальных действия — звонок и Telegram.

## Do's and Don'ts

### Do:

- **Do** начинать ключевые сцены с реальных фотографий клуба и проверенных данных.
- **Do** сохранять жёлто-белые Oswald-сообщения крупнее обычного UI.
- **Do** проверять каждый новый блок на 360px и 430px до desktop-расширения.
- **Do** сохранять pointer на desktop, scroll/swipe реакцию на touch и статичный reduced-motion fallback.
- **Do** использовать chamfered plate и электрическую кромку для состояния и действия.

### Don't:

- **Don't** возвращать Live Match Lobby, сборку ПК или старую бумажно-жёлтую систему как визуальную основу.
- **Don't** использовать Unbounded вне знака META4PRO или заменять Oswald на Onest в display-ролях.
- **Don't** строить страницу из одинаковых rounded cards, pill-кнопок или шаблонного glassmorphism.
- **Don't** подменять реальный зал игровыми персонажами, абстрактным фоном или rasterized UI.
- **Don't** давать хрому, молниям или scroll-linked эффектам перехватывать pointer, touch, прокрутку или смысл.
