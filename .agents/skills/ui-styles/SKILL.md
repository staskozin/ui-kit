---
name: ui-styles
description: Используй этот skill, когда нужно добавить, изменить или проверить стили компонентов в @staskozin/ui-kit.
---

# UI Styles Skill

## Назначение

Используй этот skill для любых задач, связанных со стилями в `@staskozin/ui-kit`: дизайн-токены, цветовые функции, размеры и SCSS-паттерны в компонентах.

## Когда применять

- Пользователь просит добавить или изменить стили компонента
- Нужно выбрать нейтральный или акцентный цвет компонента
- Нужно использовать дизайн-токены из `src/assets/tokens.scss`
- Нужно задать размеры в SCSS

## Источники в проекте

- `src/assets/tokens.scss` — цветовые токены и семантика тем
- `src/assets/utils.scss` — базовые SCSS-функции и миксины (`px()`, `gray()`, `color()`, `hover` и т.д.)
- `src/assets/typography.scss` — типографические миксины с префиксом `text-`
- Vite/Storybook `additionalData` — глобально подключает `utils.scss` и `typography.scss`

## Правила работы со стилями

### 1) Дизайн-токены

Токены определены в `src/assets/tokens.scss` и импортируются в `index.ts`.

### 2) Gray-палитра

Серые цвета заданы hex-значениями: `--ui-color-gray-{200..900}`.
Используй их для текста, фонов и бордеров в нейтральных состояниях.

### 3) OKLCH-шкала (100-900)

Для генерации цветов из произвольного hue используй CSS-переменные:

- `--ui-l-{step}` (lightness)
- `--ui-c-{step}` (chroma)

Значения L/C получены из Harmonizer (P3, even chroma, среднее L между четырьмя hue).

### 4) Темизация

Семантические токены переключаются через:

- `[data-theme="light"]`
- `[data-theme="dark"]`

Пример токена: `--ui-bg`.

### 5) Функция `gray()`

Возвращает серый цвет из палитры.

```scss
gray(700) // -> var(--ui-color-gray-700)
```

### 6) Функция `color()`

Генерирует `oklch()` из уровня шкалы и hue.

```scss
color(700)       // -> oklch(var(--ui-l-700) var(--ui-c-700) var(--hue))
color(700, 226)  // -> oklch(var(--ui-l-700) var(--ui-c-700) 226)
```

Компоненты задают `--hue` через проп и используют `color(step)` в стилях.

- Без `hue` используй `gray()` для нейтрального варианта
- С `hue` используй `color()` для акцентного варианта

```scss
// Нейтральный (по умолчанию)
background-color: gray(600);

// Акцентный (при наличии hue)
&.--accent {
    background-color: color(700);
}
```

### 7) Размеры через `px()`

Все размеры в SCSS задавай через `px()` из `src/assets/utils.scss`.
Функция конвертирует px в rem: `px(16)` -> `1rem`.

Это нужно для масштабирования через `font-size` на `<html>`.

```scss
padding: px(8) px(20); // -> 0.5rem 1.25rem
border-radius: px(4); // -> 0.25rem
```

### 8) Типографика через миксины `text-*`

Типографику задавай через миксины из `src/assets/typography.scss`.
Имена миксинов должны быть с префиксом `text-`.

Доступные миксины:

- `text-caption`
- `text-smaller`
- `text-main`
- `text-subtitle`
- `text-title`
- `text-smaller-medium`
- `text-main-medium`
- `text-subtitle-medium`
- `text-title-medium`
- `text-smaller-bold`
- `text-main-bold`
- `text-subtitle-bold`
- `text-title-bold`
- `text-subtitle-light`
- `text-title-light`

Пример:

```scss
.UiButton.--size-medium {
    @include text-main;
}
```

## Ограничения

- Не используй "сырые" пиксели в стилях, если можно применить `px()`
- Не вводи новые цветовые значения без необходимости, сначала используй `gray()`/`color()`
- Сохраняй текущий паттерн neutral vs accent через `hue`
- Для типографики не дублируй `font-size/line-height/font-weight` вручную, если подходит один из `text-*` миксинов
