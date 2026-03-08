import type { Meta, StoryObj } from '@storybook/vue3-vite';

import UiButton from './UiButton.vue';
import Icons from '../assets/icons';

// Meta
const meta = {
    component: UiButton,
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: ['small', 'medium', 'large'],
            control: { type: 'inline-radio' },
        },
        icon: {
            options: Object.keys(Icons),
            control: { type: 'select' },
        },
        hue: {
            control: { type: 'range', min: 0, max: 360, step: 1 },
        },
    },
} satisfies Meta<typeof UiButton>;

export default meta;

// Stories
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {
        size: 'medium',
        disabled: false,
    },
};

export const Accent: Story = {
    args: {
        hue: 226,
    },
};

export const Icon: Story = {
    args: {
        size: 'medium',
        icon: 'calendar',
    },
};

export const IconAccent: Story = {
    args: {
        size: 'medium',
        icon: 'calendar',
        hue: 226,
    },
};

export const Red: Story = {
    args: {
        hue: 27,
    },
};

export const Green: Story = {
    args: {
        hue: 150,
    },
};
