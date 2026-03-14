import type { Meta, StoryObj } from '@storybook/vue3-vite';

import UiButton from './UiButton.vue';
import Icons from '../assets/icons';
import { UiElementSize, UiSemanticVariant } from '../types';

// Meta
const meta = {
    component: UiButton,
    tags: ['autodocs'],
    args: {
        type: 'button',
        size: UiElementSize.Medium,
        variant: UiSemanticVariant.Neutral,
    },
    argTypes: {
        type: {
            options: ['button', 'submit', 'reset'],
            control: { type: 'inline-radio' },
        },
        size: {
            options: Object.values(UiElementSize),
            control: { type: 'inline-radio' },
        },
        variant: {
            options: Object.values(UiSemanticVariant),
            control: { type: 'select' },
        },
        hue: {
            control: { type: 'range', min: 0, max: 360, step: 1 },
        },
        iconLeft: {
            options: Object.keys(Icons),
            control: { type: 'select' },
        },
        iconRight: {
            options: Object.keys(Icons),
            control: { type: 'select' },
        },
    },
} satisfies Meta<typeof UiButton>;

export default meta;

// Stories
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {
        label: 'Кнопка',
        disabled: false,
    },
};

export const Accent: Story = {
    args: {
        label: 'Кнопка',
        variant: UiSemanticVariant.Primary,
    },
};

export const IconLeft: Story = {
    args: {
        iconLeft: 'calendar',
    },
};

export const IconRight: Story = {
    args: {
        iconRight: 'chevronDown',
    },
};

export const IconLeftAccent: Story = {
    args: {
        label: 'Кнопка',
        iconLeft: 'calendar',
        variant: UiSemanticVariant.Primary,
    },
};

export const Danger: Story = {
    args: {
        label: 'Кнопка',
        variant: UiSemanticVariant.Danger,
    },
};

export const Success: Story = {
    args: {
        label: 'Кнопка',
        variant: UiSemanticVariant.Success,
    },
};

export const Warning: Story = {
    args: {
        label: 'Кнопка',
        variant: UiSemanticVariant.Warning,
    },
};

export const Info: Story = {
    args: {
        label: 'Кнопка',
        variant: UiSemanticVariant.Info,
    },
};
