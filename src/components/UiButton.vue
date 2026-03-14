<template>
    <button
        :type="type"
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
import { UiElementSize } from '../types';
import UiIcon from './UiIcon.vue';
import type { IconName } from '../assets/icons';

// Props
type UiButtonProps = {
    label?: string;
    icon?: IconName;
    type?: 'submit' | 'button' | 'reset';
    size?: UiElementSize;
    hue?: number;
    disabled?: boolean;
};

const {
    label = 'Кнопка',
    icon,
    type = 'button',
    size = UiElementSize.Medium,
    hue,
    disabled = false,
} = defineProps<UiButtonProps>();

// Computed
const classList = computed(() => {
    return [
        `--size-${size}`,
        ...(icon ? ['--has-icon'] : []),
        ...(label ? ['--has-label'] : []),
        ...(hue !== undefined ? ['--accent'] : []),
    ];
});

const iconSize = computed(() => {
    return size !== UiElementSize.Large ? size : UiElementSize.Medium;
});

const styleList = computed(() => {
    return hue !== undefined ? { '--hue': hue } : {};
});
</script>

<style lang="scss">
.UiButton {
    @include transition-instant-hover(background-color);

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
    align-items: center;
    column-gap: px(8);
    border: none;
    border-radius: px(4);
    cursor: pointer;
    background-color: gray(400);
    color: gray(800);

    &:hover {
        background-color: gray(500);
    }

    &:active {
        background-color: gray(600);
    }

    &:disabled {
        background-color: gray(400);
        color: gray(500);
    }

    &:focus {
        outline: px(2) solid gray(300);
        box-shadow: 0px 0px 8px gray(300);
    }

    .UiIcon {
        color: gray(800);
    }

    &.--accent {
        background-color: color(700);
        color: gray(200);

        &:hover {
            background-color: color(800);
            color: gray(300);
        }

        &:active {
            background-color: color(900);
            color: gray(400);
        }

        &:disabled {
            background-color: color(200);
            color: gray(300);
        }

        &:focus {
            outline: px(2) solid gray(300);
        }

        .UiIcon {
            color: gray(200);
        }
    }

    &.--size-small {
        font-size: px(14);
        line-height: px(20);
        padding: px(5) px(14) px(7);
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
        padding: px(11) px(24) px(13);
    }
}

[data-theme='dark'] .UiButton {
    &:disabled {
        background-color: gray(700);
        color: gray(600);
    }

    &.--accent:disabled {
        background-color: color(900);
        color: gray(600);
    }
}
</style>
