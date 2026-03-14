# AGENTS.md

This file provides guidance to AI models when working with code in this repository.

## Проект

`@staskozin/ui-kit` — npm-библиотека Vue 3 компонентов (личный UI Kit). Публикуется как ES-модуль с TypeScript-типами.

## Стек

- **Vue 3** + **TypeScript** (~5.9, strict mode, noUnusedLocals, noUnusedParameters)
- **Vite 7** в library mode (формат ES, vue externalized)
- **SCSS** (sass-embedded) — scoped styles в SFC (правила стилей вынесены в skill `ui-styles`)
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
  types.ts              — общие типы (UiElementSize: Small, Medium, Large)
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

Для генерации commit message используй отдельный skill `commit-msg`:

- `.agents/skills/commit-msg/SKILL.md`

Используй его, когда нужно сформировать сообщение коммита по Conventional Commits (на русском), по описанию пользователя или по staged changes.

## Стили

Правила по дизайн-токенам, цветовым функциям (`gray()`, `color()`) и размерам через `px()` вынесены в отдельный skill:

- `.agents/skills/ui-styles/SKILL.md`

## Как добавлять компоненты

1. Создать `src/components/UiНазвание.vue` (префикс `Ui`)
2. Добавить экспорт в `src/index.ts`: `export { default as UiНазвание } from './components/UiНазвание.vue'`
3. Создать story рядом: `src/components/UiНазвание.stories.ts`

## Skills

Проектные skills хранятся в репозитории по пути:

```text
.agents/skills/<skill-name>/SKILL.md
```

Рекомендуемая структура skill:

- `SKILL.md` — назначение, триггеры, пошаговый workflow, ограничения
- `scripts/` — вспомогательные скрипты для skill
- `templates/` или `assets/` — переиспользуемые шаблоны/ресурсы

Правила:

- Имена директорий skills — короткие и стабильные, в `kebab-case`
- Один skill = одна задача или workflow
- Изменения skills проходят через PR вместе с кодом проекта
- При работе агент должен сначала использовать skills, подключенные раннером, и учитывать проектные skills из `.agents/skills`, если они доступны в контексте
