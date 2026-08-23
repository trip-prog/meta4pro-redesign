---
name: "META4PRO"
description: "Live Match Lobby — молодёжный интерфейс компьютерного клуба с аппаратной точностью и одним жёлтым сигналом."
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
    fontSize: "clamp(2.75rem, 12.8vw, 6rem)"
    fontWeight: 720
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Unbounded Variable, sans-serif"
    fontSize: "clamp(2.7rem, 10vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Onest Variable, sans-serif"
    fontSize: "1rem"
    fontWeight: 470
    lineHeight: 1.55
  label:
    fontFamily: "Onest Variable, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 760
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  control: "12px"
  media: "14px"
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
  photo-frame:
    backgroundColor: "{colors.graphite}"
    rounded: "{rounded.media}"
---

# Design System: META4PRO

## Overview

**Creative North Star: "Live Match Lobby"**

META4PRO выглядит как момент перед стартом матча: глубокая тёмная арена, точный жёлтый сигнал, крупная типографика и реальное железо. Система энергичная, но не «киберпанковая»: достоверные фотографии и характеристики важнее декоративного шума.

Главный выразительный приём — одна аппаратная сцена, где компьютер собирается при прокрутке. Остальные поверхности спокойнее и помогают быстро сравнить зоны и перейти к бронированию.

**Key Characteristics:**

- Мобильная версия является основной, desktop расширяет тот же мир.
- Чёрный создаёт атмосферу, тёплая бумага даёт контрастный информационный ритм.
- Жёлтый обозначает действие, выбранное состояние или важный статус.
- Реальные фотографии клуба и узнаваемые детали ПК — обязательная основа доверия.

## Colors

Палитра построена на контрасте тёмной арены, тёплой светлой поверхности и одного сигнального жёлтого.

### Primary

- **Signal Yellow:** основной CTA, активные состояния, аппаратные акценты и ключевые значения.
- **Deep Signal:** читаемый жёлто-оливковый акцент только на светлых поверхностях.

### Neutral

- **Arena Black:** главный тёмный фон, тёмные кнопки и активные зоны.
- **Arena Soft и Graphite:** вторичные тёмные поверхности без декоративной тени.
- **Warm Paper:** светлые информационные секции и тёмный текст.
- **Paper Muted и Steel:** вторичный текст, границы и служебные подписи.

**The One Signal Rule.** На одном экране жёлтый должен оставаться редким сигналом, а не фоновым украшением.

## Typography

**Display Font:** Unbounded Variable (sans-serif fallback)  
**Body Font:** Onest Variable (sans-serif fallback)

**Character:** Unbounded создаёт плотный соревновательный ритм, Onest сохраняет быструю читаемость цен, характеристик и действий на телефоне.

### Hierarchy

- **Display** (720, fluid, 0.9): один крупный тезис первого экрана.
- **Headline** (700, fluid, 0.92): названия больших смысловых секций.
- **Body** (470, 1rem, 1.55): описания длиной до 57ch.
- **Label** (760, 0.625rem, 0.08em, uppercase): статусы, частоты и служебные подписи.

**The Headline Carries It Rule.** Не ставить kicker или eyebrow над заголовком; статус располагается после тезиса либо в отдельном функциональном рельсе.

## Layout

Контент ограничен шириной 1440px, поля страницы задаются fluid-значением от 18px до 68px. На телефоне блоки складываются в один поток, зоны показываются сеткой 2×2, а бронирование фиксируется у нижней safe area. С 820px включаются desktop-композиции; тяжёлые WebGL-эффекты дополнительно требуют широкого экрана и точного указателя.

Hero — длинная sticky-сцена: текст и аппаратные слои живут в одном viewport, а прокрутка управляет сборкой. Горизонтальная галерея на touch использует scroll snap; desktop может заменить её Circular Gallery.

## Elevation & Depth

Система почти плоская. Глубину создают фотографии, градиентные затемнения, перекрытие слоёв и локальный drop-shadow у ПК; обычные карточки не поднимаются над страницей. Выраженная тень допустима у фиксированного мобильного CTA, чтобы отделить его от контента.

**The Flat-by-Default Rule.** Тень появляется только там, где объясняет реальное наложение или фиксированное состояние.

## Shapes

Интерактивные элементы используют уверенные скругления 12px, фото и крупные тёмные консоли — 14px. Круглые формы ограничены иконками и техническими деталями. Тонкие линии, рельсы прогресса и обрезанные фото поддерживают аппаратный характер.

## Components

### Buttons

- **Shape:** компактный прямоугольник с радиусом 12px и минимальной высотой 52px.
- **Primary:** Signal Yellow на Arena Black; чёрный текст, уверенный вес.
- **Hover / Focus:** осветление жёлтого; focus-visible — внешний жёлтый контур 3px.
- **Ink:** чёрная кнопка на светлой поверхности, без постоянной тени.

### Chips

- **Style:** zone selector работает как группа доступных кнопок 2×2; неактивные прозрачные, выбранная зона чёрная или жёлтая по контексту.
- **State:** выбранное состояние дублируется цветом и `aria-selected`, клавиатура использует Arrow/Home/End.

### Cards / Containers

- **Corner Style:** 12px для zone controls, 14px для фото и booking console.
- **Background:** поверхности либо полностью светлые, либо полностью тёмные.
- **Shadow Strategy:** без тени в покое.
- **Border:** тонкая нейтральная граница только там, где она показывает состояние.

### Navigation

Фиксированная верхняя навигация прозрачна над hero и получает плотный чёрный фон при открытии mobile menu. На desktop ссылки компактны; на mobile используется одна кнопка меню с доступным состоянием.

### Scroll-built PC

Девять зарегистрированных прозрачных слоёв сходятся в реальный финальный ПК. Статус и прогресс показывают последовательность, а reduced-motion сразу отображает готовую машину без промежуточной анимации.

## Do's and Don'ts

### Do:

- **Do** использовать реальные фото клуба и реальные характеристики.
- **Do** проверять каждый новый экран на ширинах 360–430px.
- **Do** оставлять один главный электрический акцент в пределах viewport.
- **Do** давать WebGL только способным desktop-устройствам и сохранять полноценный CSS fallback.

### Don't:

- **Don't** строить страницу из одинаковых карточек «иконка + заголовок + текст».
- **Don't** использовать фиолетово-синий неон, голограммы, glassmorphism или игровых персонажей.
- **Don't** ставить kicker/eyebrow над заголовком.
- **Don't** имитировать форму бронирования без рабочего backend.
