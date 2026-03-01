# AGENTS.md

## Проект

`@staskozin/ui-kit` — npm-библиотека Vue 3 компонентов (личный UI Kit). Публикуется как ES-модуль с TypeScript-типами.

## Стек

- **Vue 3** + **TypeScript** (~5.9)
- **Vite 7** в library mode (формат ES, vue externalized)
- **Storybook 10** (vue3-vite) — для разработки и демонстрации компонентов
- **Vitest** + Playwright — тестирование stories в браузере
- **semantic-release** — автоматическое версионирование и публикация на npm
- **commitlint** + **husky** — валидация conventional commits

## Структура

```
src/
  index.ts              — точка входа библиотеки, реэкспорт компонентов
  components/           — Vue-компоненты (.vue файлы)
.storybook/             — конфиг Storybook (main.ts, preview.ts, vitest.setup.ts)
.github/workflows/
  release.yml           — CI: build → semantic-release на push в main
.husky/commit-msg       — хук commitlint
.releaserc.json         — конфиг semantic-release
commitlint.config.js    — conventional commits
vite.config.ts          — library mode + vitest + storybook addon
```

## Скрипты

- `npm run dev` — Storybook на localhost:6006
- `npm run build` — vue-tsc + vite build → `dist/index.js` + `dist/index.d.ts`
- `npm run build:storybook` — статичная сборка Storybook

## Сборка

Vite собирает библиотеку в `dist/`:
- `dist/index.js` — ES-модуль
- `dist/index.d.ts` — типы (rollupTypes через vite-plugin-dts)
- `vue` — external (peer dependency)

## Публикация

- Версия в package.json — `0.0.0-semantically-released` (semantic-release подставляет реальную)
- Push в `main` запускает GitHub Actions → build → semantic-release → npm publish
- Секреты: `NPM_TOKEN` (в GitHub repo settings)
- `publishConfig.access: "public"` (scoped-пакет)

## Коммиты

Используется Conventional Commits. Примеры:
- `feat: add UiButton component` — minor release
- `fix: correct padding in UiCard` — patch release
- `feat!: redesign UiButton API` — major release (breaking change)

## Как добавлять компоненты

1. Создать `src/components/UiНазвание.vue`
2. Добавить экспорт в `src/index.ts`: `export { default as UiНазвание } from './components/UiНазвание.vue'`
3. Создать story рядом или в отдельной папке
