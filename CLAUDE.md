# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Проект

`@staskozin/ui-kit` — npm-библиотека Vue 3 компонентов (личный UI Kit). Публикуется как ES-модуль с TypeScript-типами.

## Стек

- **Vue 3** + **TypeScript** (~5.9, strict mode, noUnusedLocals, noUnusedParameters)
- **Vite 7** в library mode (формат ES, vue externalized)
- **SCSS** (sass-embedded) — scoped styles в SFC, единицы em
- **Storybook 10** (vue3-vite) — для разработки и демонстрации компонентов
- **Vitest** + Playwright — тестирование stories в браузере (chromium, headless)
- **semantic-release** — автоматическое версионирование и публикация на npm
- **commitlint** + **husky** — валидация conventional commits

## Скрипты

```bash
npm run dev              # Storybook на localhost:6006
npm run build            # vue-tsc + vite build → dist/
npm run build:storybook  # статичная сборка Storybook
```

## Структура

```
src/
  index.ts              — точка входа, реэкспорт компонентов и типов
  types.ts              — общие типы (UiElementSize: 'small' | 'medium' | 'large')
  assets/
    fonts.scss          — @font-face Inter (импортируется в index.ts)
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

## Как добавлять компоненты

1. Создать `src/components/UiНазвание.vue` (префикс `Ui`)
2. Добавить экспорт в `src/index.ts`: `export { default as UiНазвание } from './components/UiНазвание.vue'`
3. Создать story рядом: `src/components/UiНазвание.stories.ts`
