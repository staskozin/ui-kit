import type { Preview } from '@storybook/vue3-vite';
import '../src/assets/fonts.scss';
import '../src/assets/tokens.scss';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },

        a11y: {
            // 'todo' - show a11y violations in the test UI only
            // 'error' - fail CI on a11y violations
            // 'off' - skip a11y checks entirely
            test: 'todo',
        },
    },

    globalTypes: {
        theme: {
            description: 'Тема оформления',
            toolbar: {
                title: 'Theme',
                icon: 'mirror',
                items: [
                    { value: 'light', title: 'Light' },
                    { value: 'dark', title: 'Dark' },
                ],
                dynamicTitle: true,
            },
        },
    },

    initialGlobals: {
        theme: 'light',
    },

    decorators: [
        (story, context) => {
            const theme = context.globals.theme || 'light';
            document.documentElement.setAttribute('data-theme', theme);
            return story();
        },
    ],
};

export default preview;
