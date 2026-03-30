# Current Architecture Decisions

## 1. Общая характеристика библиотеки

**Подтверждается кодом**

- Проект оформлен как npm-библиотека `@staskozin/ui-kit` с единственным пакетным entry point и сборкой в `dist` (`package.json`, `vite.config.ts`).
- Runtime-часть сейчас минимальная: публично экспортируется только `UiButton` и общие типы, а фактически реализованы два Vue-компонента (`src/components/UiButton.vue`, `src/components/UiIcon.vue`, `src/index.ts`).
- Storybook встроен как отдельный слой разработки и документации (`npm run dev`, `.storybook/main.ts`, `.storybook/preview.ts`, `src/**/*.stories.*`, `src/**/*.mdx`).
- В репозитории явно выделены подсистемы: runtime-компоненты (`src/components`), дизайн-ассеты/токены (`src/assets`), Storybook-конфиг (`.storybook`), release/publish pipeline (`.github/workflows/release.yml`, `.releaserc.json`).

**Вывод по косвенным признакам**

- Библиотека находится на ранней стадии развития design system: инфраструктура уже богаче текущего набора компонентов.
- Storybook используется не только как документация, но и как рабочее окружение разработки компонентов.

## 2. Технологическая база

**Подтверждается кодом**

- Vue 3: `vue` в `peerDependencies` и `devDependencies`, SFC-компоненты с `<script setup lang="ts">`.
- TypeScript: strict-конфигурации в `tsconfig.app.json` и `tsconfig.node.json`, проектные references в `tsconfig.json`.
- Сборка: Vite library mode + `@vitejs/plugin-vue` + `vite-plugin-dts` (`vite.config.ts`).
- Стилизация: SCSS (`sass-embedded`), глобальные SCSS utilities/mixins через `css.preprocessorOptions.scss.additionalData` в Vite и Storybook.
- Storybook: `@storybook/vue3-vite` + addons `docs`, `a11y`, `vitest`, `onboarding`.
- Тестовый стек: Vitest + Browser mode + Playwright provider + Storybook Vitest plugin (`vite.config.ts`).
- Release: semantic-release + GitHub Actions (`.releaserc.json`, `.github/workflows/release.yml`).

**Вывод по косвенным признакам**

- Архитектурно сделан акцент на ESM-first поставку и на Storybook-centric workflow.
- Runtime-зависимости почти отсутствуют: для потребителя обязателен только `vue`, остальное остается dev-инфраструктурой библиотеки.

## 3. Структура проекта

**Подтверждается кодом**

- Архитектурно значимые директории верхнего уровня: `src`, `.storybook`, `.github/workflows`, `.husky`.
- В `src` есть только две доменные папки: `components` и `assets`.
- `src/components`: flat-структура компонентов, `UiButton.stories.ts` colocated со `UiButton.vue`.
- `src/assets`: `tokens.scss`, `utils.scss`, `typography.scss`, `fonts.scss`, `icons.ts`, файлы шрифтов.
- Отдельных директорий `composables`, `directives`, `utils` (runtime), `themes` как самостоятельного слоя в `src` нет.

**Вывод по косвенным признакам**

- Компонентная организация сейчас ближе к flat/monolithic подходу, а не к feature- или domain-группировке.
- Внутренний/внешний слой разделяется не структурой каталогов, а экспортами из `src/index.ts`.

## 4. Public API библиотеки

**Подтверждается кодом**

- Единая точка входа для потребителя задается через `src/index.ts` и `package.json.exports["."]` (`package.json`, `vite.config.ts`).
- `exports` в `package.json` содержит только `.` и не содержит subpath exports.
- Публично из `src/index.ts` экспортируются `UiButton`, `UiElementSize`, `UiSemanticVariant`.
- `UiIcon`, `assets/icons.ts`, SCSS utility-файлы не экспортируются как часть API.

**Вывод по косвенным признакам**

- Граница public API формально централизована и минималистична.
- Внешний потребитель подразумевается как пользователь единого package entry, а не внутренних модулей.

## 5. Архитектура компонентов

**Подтверждается кодом**

- Компоненты реализованы как Vue SFC на `script setup` с typed `defineProps`.
- `UiButton` композиционно использует `UiIcon`, то есть есть базовый внутренний уровень переиспользования через компонент-утилиту.
- Общие паттерны: вычисление modifier-классов через `computed`, BEM-подобные классы (`--size-*`, `--accent`, `--warning`, `--has-*`), инкапсуляция визуального состояния в CSS-классы.
- `props/emits/slots`:
- `UiButton`: есть props, `emits` отсутствуют, `slots` отсутствуют, `v-model` отсутствует, `defineExpose` отсутствует.
- `UiIcon`: аналогично, только props.
- `UiButton` реализует API-философию через пропы (label/icon/variant/hue/size/disabled/type), а не через slots.

**Вывод по косвенным признакам**

- Текущий компонентный подход декларативно-проповый и статeless (controlled-поведение извне): внутреннего состояния практически нет.
- В библиотеке пока нет отдельного abstraction слоя для переиспользования логики, кроме shared TS-констант и внутреннего `UiIcon`.

## 6. Стилизация и design tokens

**Подтверждается кодом**

- Стратегия стилизации: SCSS в SFC + глобальные CSS variables (`src/assets/tokens.scss`) + SCSS-функции/миксины (`src/assets/utils.scss`, `src/assets/typography.scss`).
- CSS modules/Tailwind/utility-framework в проекте не используются.
- Есть слой design tokens:
- палитра gray (`--ui-color-gray-*`);
- шкала OKLCH (`--ui-l-*`, `--ui-c-*`);
- семантический токен `--ui-bg` для light/dark.
- Theme layer реализован через `data-theme` (`light`/`dark`) и переключается в Storybook decorator.
- Варианты и состояния в `UiButton` выражаются через классы-модификаторы и функции `gray()`/`color()`.
- Глобальные стили и токены подключаются side-effect импортами в `src/index.ts` и отдельно в `.storybook/preview.ts`.

**Вывод по косвенным признакам**

- Кастомизация библиотеки предполагается через сочетание пропов (`variant`, `hue`, `size`) и CSS custom properties/theme-атрибута.
- Дизайн-система построена вокруг SCSS authoring-time layer + CSS variable runtime layer.

## 7. Типизация и контракты

**Подтверждается кодом**

- Типизация централизована для общих UI-семантик в `src/types.ts` (`UiElementSize`, `UiSemanticVariant` + соответствующие union-типы).
- Контракт иконок типизирован через `IconName = keyof typeof Icons` в `src/assets/icons.ts`.
- TS-режим строгий: `strict`, `noUnusedLocals`, `noUnusedParameters`, `noUncheckedSideEffectImports`, `noFallthroughCasesInSwitch`.
- Генерация типов для публикации настроена через `vite-plugin-dts` (`rollupTypes: true`).

**Вывод по косвенным признакам**

- В проекте принят паттерн “runtime const + derived type” как базовый способ описания доменных перечислений.
- На уровне API приоритет отдан compile-time safety для пропов и семантических вариантов.

## 8. Storybook как слой документации и разработки

**Подтверждается кодом**

- Storybook конфиг ищет и `*.stories.*`, и `*.mdx` в `src` (`.storybook/main.ts`).
- `UiButton.stories.ts` использует `args`, `argTypes`, controls и `tags: ['autodocs']`.
- Есть отдельная MDX-страница `src/TypeScriptTypes.mdx` для документирования публичных TS-типов.
- В preview есть глобальные параметры controls/a11y, глобальный toolbar theme и decorator, который меняет `data-theme` у `document.documentElement`.

**Вывод по косвенным признакам**

- Storybook встроен как основной dev-environment для ручной проверки и документации компонента.
- Документация максимально привязана к исходникам (co-location stories и MDX в `src`).

## 9. Подход к тестированию

**Подтверждается кодом**

- Vitest настроен в `vite.config.ts` через `storybookTest(...)` plugin, браузерный режим и Playwright Chromium.
- `.storybook/vitest.setup.ts` применяет project annotations и a11y-addon для story-based тестов.
- Отдельных файлов `*.test.*`/`*.spec.*` в репозитории нет.
- В release CI (`.github/workflows/release.yml`) выполняются `npm run lint` и `npm run build`; явного шага `vitest` нет.
- В Storybook preview a11y `test: 'todo'`, а не fail-fast режим.

**Вывод по косвенным признакам**

- Основная тестовая стратегия ориентирована на story-based сценарии, а не на отдельный слой unit/integration тестов.
- Автоматизированное тестирование компонентов в CI не выглядит обязательным gate для релиза на текущем этапе.

## 10. Сборка и поставка библиотеки

**Подтверждается кодом**

- Сборка библиотеки: `vue-tsc -b && vite build` (`package.json`).
- Формат поставки: только ES module (`build.lib.formats = ['es']`).
- `vue` externalized в Rollup (`rollupOptions.external = ['vue']`), что снижает дублирование рантайма.
- Публикуемые артефакты на уровне пакета ограничены `dist` (`files: ["dist"]`).
- Целевая сборка формирует `index.js`, `index.d.ts`, `index.css` в `dist`.
- `sideEffects: false` заявляет tree-shaking friendly модель пакета.

**Вывод по косвенным признакам**

- Потребление библиотеки предполагается через ESM-совместимый toolchain.
- Стили и ассеты сведены в отдельный CSS-артефакт поставки.
- Runtime-код компонентов не зависит от Storybook-пакетов, значит vendor lock-in на Storybook в runtime-слое не наблюдается.

## 11. Архитектурные ограничения, которые уже сложились

**Подтверждается кодом**

- Публичный API централизован через один entry (`src/index.ts` / `package.json.exports`).
- Нейминг компонентов с префиксом `Ui` используется системно.
- Общие размерные/семантические контракты задаются через централизованные const+type в `src/types.ts`.
- Стилевой слой опирается на `px()`, `gray()`, `color()`, `text-*` mixins и на токены в CSS custom properties.
- Коммит-политика закреплена через husky + commitlint; релизный процесс автоматизирован semantic-release.

**Вывод по косвенным признакам**

- Даже при малом числе компонентов уже сформированы правила расширения: новый компонент ожидается как `UiXxx.vue` + экспорт в `index.ts` + story рядом.
- Архитектура развития проектируется вокруг постепенного наращивания компонентов в уже существующий токенизированный стиль.

## 12. Неоднородности и спорные места

**Подтверждается кодом**

- Runtime-исходники и документационные артефакты (`stories`/`mdx`) живут в одном source-tree `src`.
- В проекте одновременно есть строгая TS/Storybook/Vitest инфраструктура и минимальное фактическое покрытие компонентного слоя.
- Theme support распределен между токенами (`--ui-bg`) и локальными компонентными override-ами (`[data-theme='dark'] .UiButton`).
- Storybook docs используют внутренние модули (`src/assets/icons.ts`), не входящие в public exports.

**Вывод по косвенным признакам**

- Часть архитектурных решений уже эволюционировала быстрее, чем сопровождающая документация и процессы.
- Основные спорные точки сосредоточены на границах между runtime-, docs- и test-слоями.

## 13. Краткий вывод

**Подтверждается кодом**

- Текущая архитектура — компактная Vue 3 UI-библиотека с единым public entry, SCSS+token styling, строгой TypeScript базой и Storybook-first процессом разработки/документации.

**Вывод по косвенным признакам**

- Системными выглядят решения про централизованный API вход, типовые константы, токены, SCSS-утилиты и co-location stories.
- Случайными или переходными выглядят неполная интеграция тестов в CI и частичный дрейф процессной документации.

## Appendix: Evidence

Список наблюдений, на которых основан документ:

- Ключевые директории:
- `src/components`
- `src/assets`
- `.storybook`
- `.github/workflows`
- `.husky`

- Ключевые файлы:
- `package.json`
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `vite.config.ts`
- `src/index.ts`
- `src/types.ts`
- `src/components/UiButton.vue`
- `src/components/UiIcon.vue`
- `src/components/UiButton.stories.ts`
- `src/TypeScriptTypes.mdx`
- `src/assets/tokens.scss`
- `src/assets/utils.scss`
- `src/assets/typography.scss`
- `src/assets/icons.ts`
- `.storybook/main.ts`
- `.storybook/preview.ts`
- `.storybook/vitest.setup.ts`
- `.github/workflows/release.yml`
- `.releaserc.json`

- Важные зависимости и инструменты:
- `vue`, `typescript`, `vite`, `vite-plugin-dts`, `sass-embedded`
- `storybook` и addons (`docs`, `a11y`, `vitest`, `onboarding`)
- `vitest`, `@vitest/browser-playwright`, `playwright`
- `semantic-release`, `husky`, `commitlint`

- Ключевые entry points и exports:
- Source entry: `src/index.ts`
- Build entry: `vite.config.ts -> build.lib.entry`
- Package exports map: `package.json.exports["."]`

- Характерные повторяющиеся паттерны в компонентах:
- `script setup` + typed `defineProps`
- вычисление modifier-классов через `computed`
- BEM-подобные class modifiers (`--size-*`, `--accent`, `--has-*`)
- стилевые состояния через SCSS-функции `gray()/color()` и theme selectors

- Характерные patterns в stories и тестах:
- `Meta`/`StoryObj` + `args`/`argTypes` controls
- `tags: ['autodocs']`
- отдельная MDX-страница для TS типов
- story-based test integration через `storybookTest` + Vitest browser + Playwright
