# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Проект

`@staskozin/ui-kit` — npm-библиотека Vue 3 компонентов (личный UI Kit). Публикуется как ES-модуль с TypeScript-типами.

## Стек

- **Vue 3** + **TypeScript** (~5.9, strict mode, noUnusedLocals, noUnusedParameters)
- **Vite 7** в library mode (формат ES, vue externalized)
- **SCSS** (sass-embedded) — scoped styles в SFC, размеры через функцию `px()` (см. ниже)
- **Storybook 10** (vue3-vite) — для разработки и демонстрации компонентов
- **Vitest** + Playwright — тестирование stories в браузере (chromium, headless)
- **semantic-release** — автоматическое версионирование и публикация на npm
- **commitlint** + **husky** — валидация conventional commits

## Скрипты

```bash
npm run dev              # Storybook на localhost:6006
npm run build            # vue-tsc + vite build → dist/
npm run build:storybook  # статичная сборка Storybook
npm run lint             # проверка форматирования (prettier --check)
npm run format           # автоформатирование (prettier --write)
npx vitest               # запуск тестов (stories в headless chromium)
```

## Структура

```
src/
  index.ts              — точка входа, реэкспорт компонентов и типов
  types.ts              — общие типы (UiElementSize: 'small' | 'medium' | 'large')
  assets/
    fonts.scss          — @font-face Inter (импортируется в index.ts)
    tokens.scss         — CSS custom properties: цветовая палитра и семантические токены тем
    utils.scss          — SCSS-функция px() (подключена глобально через additionalData)
    icons.ts            — SVG-константы иконок
  components/
    UiКомпонент.vue     — SFC компонент
    UiКомпонент.stories.ts — Storybook stories (рядом с компонентом)
```

## Сборка

- `dist/index.js` — ES-модуль (sideEffects: false, tree-shakeable)
- `dist/index.d.ts` — типы (rollupTypes через vite-plugin-dts)
- `vue` — external (peer dependency, не бандлится)

## Публикация

- Push в `main` → GitHub Actions → build → semantic-release → npm publish
- Версия управляется semantic-release автоматически, не менять вручную
- Секреты: `NPM_TOKEN` (в GitHub repo settings)
- `publishConfig.access: "public"` (scoped-пакет)

## Коммиты

Conventional Commits (commitlint + husky hook). Сообщения на русском. Примеры:

- `feat(components): добавлен UiButton` — minor release
- `fix(package.json): обновлены зависимости` — patch release
- `feat!: редизайн API UiButton` — major release (breaking change)

## Дизайн-токены

Цвета определены как CSS custom properties в `src/assets/tokens.scss` и импортируются в `index.ts`. Палитра: `--ui-color-{gray|blue|red|green|yellow}-{100..1000}`. Семантические токены (например `--ui-bg`) переключаются через `[data-theme='light']` / `[data-theme='dark']`.

## Размеры в стилях

Все размеры указываются в пикселях через SCSS-функцию `px()` из `src/assets/utils.scss`. Функция конвертирует пиксели в `rem` (`px(16)` → `1rem`), что позволяет масштабировать всё приложение через `font-size` на `<html>`. Функция доступна глобально во всех компонентах через `additionalData` в Vite и Storybook.

```scss
padding: px(8) px(20); // → 0.5rem 1.25rem
border-radius: px(4); // → 0.25rem
```

## Как добавлять компоненты

1. Создать `src/components/UiНазвание.vue` (префикс `Ui`)
2. Добавить экспорт в `src/index.ts`: `export { default as UiНазвание } from './components/UiНазвание.vue'`
3. Создать story рядом: `src/components/UiНазвание.stories.ts`
