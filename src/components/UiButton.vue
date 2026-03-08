<template>
    <button
        :disabled="disabled"
        :class="classList"
        :style="styleList"
        class="UiButton"
    >
        <UiIcon
            v-if="icon"
            :name="icon"
            :size="iconSize"
        />

        {{ label }}
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { UiElementSize } from '../types';
import UiIcon from './UiIcon.vue';

// Props
type UiButtonProps = {
    label?: string;
    icon?: 'calendar';
    size?: UiElementSize;
    hue?: number;
    disabled?: boolean;
};

const {
    label = 'Кнопка',
    icon,
    size = 'medium',
    hue = 226,
    disabled = false,
} = defineProps<UiButtonProps>();

// Computed
const classList = computed(() => {
    return [
        `--size-${size}`,
        ...(icon ? ['--has-icon'] : []),
        ...(label ? ['--has-label'] : []),
    ];
});

const iconSize = computed(() => {
    return size !== 'large' ? size : 'medium';
});

const styleList = computed(() => {
    return { '--hue': hue };
});
</script>

<style lang="scss">
.UiButton {
    // Авто-цвет текста: белый при тёмном фоне, тёмный при светлом
    --_text-l: clamp(0.15, (0.6 - var(--ui-l-700)) * 1000, 0.99);

    font-family:
        'Inter',
        -apple-system,
        BlinkMacSystemFont,
        'Segoe UI',
        Roboto,
        'Helvetica Neue',
        Arial,
        'Noto Sans',
        sans-serif;
    font-weight: 400;
    display: flex;
    column-gap: px(8);
    border: none;
    border-radius: px(4);
    cursor: pointer;
    background-color: color(700);
    color: var(--ui-color-gray-200);

    &:hover {
        background-color: color(800);
    }

    &:active {
        background-color: color(900);
        color: var(--ui-color-gray-300);
    }

    &:disabled {
        background-color: color(100);
        color: var(--ui-color-gray-400);
    }

    &.--size-small {
        font-size: px(14);
        line-height: px(20);
        padding: px(5) px(14) px(7) px(14);
        column-gap: px(4);
    }

    &.--size-medium {
        font-size: px(16);
        line-height: px(24);
        padding: px(7) px(20) px(9);

        &.--has-icon {
            padding: px(8) px(12);

            &:not(.--has-label) {
                padding: px(10);
            }
        }
    }

    &.--size-large {
        font-size: px(16);
        line-height: px(24);
        padding: px(12) px(24);
    }
}

[data-theme='dark'] .UiButton {
    &:disabled {
        background-color: color(900);
        color: var(--ui-color-gray-600);
    }
}
</style>
