---
name: "META4PRO"
description: "Live Match Lobby — mobile-first интерфейс компьютерного клуба с реальным железом и одним жёлтым сигналом."
colors:
  arena-black: "#070706"
  arena-soft: "#121210"
  graphite: "#1d1d1a"
  warm-paper: "#f3f1e8"
  paper-muted: "#d0cec5"
  steel: "#84847d"
  signal-yellow: "#ffd400"
  signal-deep: "#9f8300"
typography:
  display:
    fontFamily: "Unbounded Variable, sans-serif"
    fontSize: "clamp(2.8rem, 13vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.86
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Onest Variable, sans-serif"
    fontSize: "clamp(2.65rem, 10vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.88
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Onest Variable, sans-serif"
    fontSize: "1rem"
    fontWeight: 470
    lineHeight: 1.55
  label:
    fontFamily: "Onest Variable, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.07em"
rounded:
  square: "0px"
  control: "12px"
  floating: "16px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "18px"
  lg: "24px"
  xl: "48px"
  page: "clamp(18px, 4vw, 68px)"
components:
  button-primary:
    backgroundColor: "{colors.signal-yellow}"
    textColor: "{colors.arena-black}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    height: "52px"
    padding: "0 17px"
  button-ink:
    backgroundColor: "{colors.arena-black}"
    textColor: "{colors.warm-paper}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    height: "52px"
    padding: "0 17px"
  zone-active:
    backgroundColor: "{colors.arena-black}"
    textColor: "{colors.warm-paper}"
    rounded: "{rounded.control}"
    padding: "14px"
  mobile-booking:
    backgroundColor: "{colors.signal-yellow}"
    textColor: "{colors.arena-black}"
    rounded: "{rounded.floating}"
    height: "58px"
    padding: "0 15px"
  final-cta:
    backgroundColor: "{colors.arena-black}"
    textColor: "{colors.warm-paper}"
    rounded: "{rounded.pill}"
    height: "58px"
    padding: "0 17px"
  photo-frame:
    backgroundColor: "{colors.graphite}"
    rounded: "{rounded.square}"
---

# Design System: META4PRO

## Overview

**Creative North Star: "Live Match Lobby"**

META4PRO выглядит как момент перед стартом матча: глубокая тёмная арена, точный жёлтый сигнал, крупная типографика и реальное железо. Система энергичная, но не типично «геймерская»: реальные фотографии и характеристики важнее декоративного шума.

Главный выразительный приём — mobile-first hero со сборкой компьютера и отзывчивым к касанию Liquid Ether. Остальные поверхности спокойнее: они помогают сравнить четыре зоны, увидеть клуб и перейти к честному контакту с администратором.

**Key Characteristics:**

- Мобильная версия является основной, desktop расширяет тот же мир.
- Чёрный создаёт атмосферу, тёплая бумага даёт контрастный информационный ритм.
- Жёлтый обозначает действие, выбранное состояние или важный статус.
- Реальные фотографии клуба и зарегистрированные стадии сборки ПК — основа доверия.

## Colors

Палитра построена на контрасте тёмной арены, тёплой светлой поверхности и одного сигнального жёлтого.

### Primary

- **Signal Yellow** (#ffd400): главный CTA, выбранные состояния, прогресс сборки и важные значения.
- **Deep Signal** (#9f8300): читаемый жёлто-оливковый акцент на светлых поверхностях.

### Neutral

- **Arena Black** (#070706): главный тёмный фон, тёмные кнопки и активные зоны.
- **Arena Soft** (#121210) и **Graphite** (#1d1d1a): вторичные тёмные поверхности.
- **Warm Paper** (#f3f1e8): светлые информационные секции и основной светлый текст.
- **Paper Muted** (#d0cec5) и **Steel** (#84847d): вторичный текст, границы и служебные подписи.

**The One Signal Rule.** На одном экране жёлтый должен оставаться редким сигналом, а не фоновым украшением.

## Typography

**Display Font:** Unbounded Variable (sans-serif fallback), только логотип и hero wordmark.
**Body Font:** Onest Variable (sans-serif fallback), для заголовков секций, текста, цифр и всего UI.

**Character:** Unbounded фиксирует узнаваемость META4PRO в двух фирменных точках. Onest ведёт весь остальной интерфейс и сохраняет быструю читаемость на телефоне.

### Hierarchy

- **Display** (700, fluid, 0.86): только логотип и слово META4PRO в hero.
- **Headline** (700, fluid, 0.88): крупные заголовки смысловых секций в Onest.
- **Body** (470, 1rem, 1.55): описания, характеристики и пояснения длиной до 57ch.
- **Label** (700, 0.625rem, 0.07em, uppercase): статусы, частоты и компактные метаданные.

**The Brand-Only Display Rule.** Не использовать Unbounded в заголовках секций, карточках, подписях или элементах управления.

**The Headline Carries It Rule.** Не ставить kicker или eyebrow над заголовком; статус располагается после тезиса либо в функциональном рельсе.

## Layout

Система mobile-first: базовая композиция — один вертикальный поток с полями страницы от 18px до 68px и контейнером до 1440px. SHIP-состояние проверено на ширинах 360px, 390px, 430px и на desktop.

Hero — длинная sticky-сцена в одном viewport. Неподвижный зарегистрированный корпус остаётся в центре, семь переходов по очереди фиксируются семью полными зарегистрированными stage-изображениями. Текст уходит в начале прокрутки, а финальный CTA появляется только после завершения сборки.

На mobile фотографии клуба образуют вертикальную sticky-колоду; при reduced motion становятся обычным статичным списком. На desktop с широким точным указателем и WebGL, начиная с 1000px, тот же контент показывает Circular Gallery. С 820px выбор зон и бронирование переходят в двухколоночные композиции.

## Elevation & Depth

Система плоская по умолчанию. Глубину создают реальные фотографии, затемнения, сборочные перекрытия и Liquid Ether; тени обозначают только физическое наложение: финальный ПК (0 32px 48px rgba(0,0,0,0.7)), mobile photo stack (0 26px 56px rgba(0,0,0,0.42)) и плавающая бронь (0 18px 42px rgba(0,0,0,0.4)).

**The Flat-by-Default Rule.** Тень появляется только там, где объясняет реальное наложение или фиксированное состояние.

## Shapes

Основные кнопки и интерактивные контролы имеют уверенный радиус 12px. Плавающая mobile-панель бронирования отделена радиусом 16px. Финальное действие после сборки — единственная pill-форма (999px) с Electric Border. Крупные фотографии, выбранная зона на desktop и booking console остаются прямоугольными без скругления.

**The One Pill Rule.** Полная pill-форма принадлежит финальному Electric Border CTA и не размножается по странице.

## Components

### Buttons

- **Shape:** основные действия — компактные прямоугольники с радиусом 12px и высотой не менее 52px.
- **Primary:** Signal Yellow на тёмной поверхности; Ink — Arena Black на Warm Paper.
- **Hover / Focus:** локальное осветление или затемнение; focus-visible — внешний жёлтый контур 3px.
- **Final:** чёрная pill-кнопка внутри одного Electric Border появляется после полной сборки ПК.

### Zone selector

- **Mobile:** доступная сетка 2×2 с контролами 12px.
- **Desktop:** вертикальный редакционный список без скруглений рядом с одним фото и блоком характеристик.
- **State:** выбор обозначается цветом и `aria-selected`; клавиатура использует Arrow, Home и End.

### Club gallery

- **Mobile / touch:** пять реальных фотографий в вертикальной sticky-колоде с прямыми углами.
- **Desktop:** Circular Gallery включается только при ширине от 1000px, точном указателе, WebGL и без reduced motion.
- **Fallback:** тот же полный набор контента остаётся доступным без canvas.

### Scroll-built PC

Неподвижный зарегистрированный корпус служит общей системой координат. Семь последовательных переходов — плата, процессор, память, охлаждение, видеокарта, питание и стекло — закрепляются полными stage-изображениями; последняя стадия показывает реальный собранный ПК. Liquid Ether реагирует на touch и pointer, но не несёт смысловой информации. Reduced motion сразу показывает готовую машину.

### Booking contacts

Выбранная зона и цена переходят в booking console. Основное действие открывает Telegram с заранее составленным черновиком сообщения для выбранной зоны; рядом всегда есть прямой телефонный звонок. Это контактный сценарий, а не имитация формы или подтверждённой онлайн-брони.

### Navigation

Фиксированная верхняя навигация прозрачна над hero и получает плотный чёрный фон при открытии mobile menu. На desktop ссылки компактны; на mobile используется одна кнопка меню с доступным состоянием.

## Do's and Don'ts

### Do:

- **Do** использовать реальные фото клуба и реальные характеристики.
- **Do** проверять новые изменения минимум на ширинах 360px, 390px, 430px и на desktop.
- **Do** оставлять один главный жёлтый сигнал в пределах viewport.
- **Do** сохранять touch-реакцию Liquid Ether и полноценный reduced-motion fallback.
- **Do** вести бронирование через Telegram-черновик и прямой телефон, пока нет backend.

### Don't:

- **Don't** строить страницу из одинаковых карточек «иконка + заголовок + текст».
- **Don't** использовать фиолетово-синий неон, голограммы, glassmorphism или игровых персонажей.
- **Don't** использовать Unbounded вне логотипа и hero wordmark.
- **Don't** заменять вертикальную mobile photo stack горизонтальной лентой.
- **Don't** имитировать форму или подтверждение бронирования без рабочего backend.
