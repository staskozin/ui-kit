import type { StorybookConfig } from '@storybook/vue3-vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-vitest',
        '@storybook/addon-a11y',
        '@storybook/addon-docs',
        '@storybook/addon-onboarding',
    ],
    framework: '@storybook/vue3-vite',
    viteFinal(config) {
        config.css ??= {};
        config.css.preprocessorOptions ??= {};
        config.css.preprocessorOptions.scss = {
            ...config.css.preprocessorOptions.scss,
            additionalData: `@use "${resolve(__dirname, '../src/assets/utils').replace(/\\/g, '/')}" as *;\n@use "${resolve(__dirname, '../src/assets/typography').replace(/\\/g, '/')}" as *;\n`,
        };
        return config;
    },
};
export default config;
