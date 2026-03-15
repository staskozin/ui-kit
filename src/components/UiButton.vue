<template>
    <button
        :type="type"
        :disabled="disabled"
        :class="classList"
        :style="styleList"
        class="UiButton"
    >
        <UiIcon
            v-if="iconLeft"
            :name="iconLeft"
            :size="iconSize"
        />

        <span
            v-if="label"
            class="UiButton__label"
        >
            {{ label }}
        </span>

        <UiIcon
            v-if="iconRight"
            :name="iconRight"
            :size="iconSize"
        />
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { UiElementSize, UiSemanticVariant } from '../types';
import UiIcon from './UiIcon.vue';
import type { IconName } from '../assets/icons';

// Props
type UiButtonProps = {
    label?: string;
    iconLeft?: IconName;
    iconRight?: IconName;
    type?: 'submit' | 'button' | 'reset';
    size?: UiElementSize;
    variant?: UiSemanticVariant;
    hue?: number;
    disabled?: boolean;
};

const {
    label,
    iconLeft,
    iconRight,
    type = 'button',
    size = UiElementSize.Medium,
    variant,
    hue,
    disabled = false,
} = defineProps<UiButtonProps>();

const hueByVariant: Record<UiSemanticVariant, number | undefined> = {
    [UiSemanticVariant.Custom]: undefined,
    [UiSemanticVariant.Neutral]: undefined,
    [UiSemanticVariant.Primary]: 226,
    [UiSemanticVariant.Success]: 145,
    [UiSemanticVariant.Warning]: 75,
    [UiSemanticVariant.Danger]: 30,
    [UiSemanticVariant.Info]: 250,
};

// Computed
const resolvedVariant = computed<UiSemanticVariant>(() => {
    if (variant !== undefined) {
        return variant;
    }

    return hue !== undefined
        ? UiSemanticVariant.Custom
        : UiSemanticVariant.Neutral;
});

const resolvedHue = computed(() => {
    if (resolvedVariant.value === UiSemanticVariant.Custom) {
        return hue;
    }

    return hueByVariant[resolvedVariant.value];
});

const classList = computed(() => {
    return [
        `--size-${size}`,
        ...(iconLeft ? ['--has-icon-left'] : []),
        ...(iconRight ? ['--has-icon-right'] : []),
        ...(label ? ['--has-label'] : []),
        ...(resolvedHue.value !== undefined ? ['--accent'] : []),
        ...(resolvedVariant.value === UiSemanticVariant.Warning
            ? ['--warning']
            : []),
    ];
});

const iconSize = computed(() => {
    return size !== UiElementSize.Large ? size : UiElementSize.Medium;
});

const styleList = computed(() => {
    return resolvedHue.value !== undefined
        ? { '--hue': resolvedHue.value }
        : {};
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
    display: flex;
    align-items: center;
    column-gap: px(8);
    border: none;
    border-radius: px(4);
    cursor: pointer;
    background-color: gray(400);
    color: gray(800);

    @include hover {
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

        @include hover {
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

    &.--accent.--warning {
        background-color: color(600);

        @include hover {
            background-color: color(700);
        }

        &:active {
            background-color: color(800);
        }

        &:disabled {
            background-color: color(300);
        }
    }

    &.--size-small {
        @include text-smaller;
        padding: px(6) px(14);
        column-gap: px(4);

        &.--has-icon-left {
            padding: px(6) px(8);

            &:not(.--has-label) {
                padding: px(8);
            }
        }
    }

    &.--size-medium {
        @include text-main;
        padding: px(8) px(20);

        &.--has-icon-left {
            padding: px(8) px(12);

            &:not(.--has-label) {
                padding: px(10);
            }
        }
    }

    &.--size-large {
        @include text-main;
        padding: px(12) px(24);

        &.--has-icon-left {
            padding: px(8) px(12);

            &:not(.--has-label) {
                padding: px(10);
            }
        }
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

// В Firefox текст в кнопке рендерится чуть ниже, поднимаем примерно на 1px для выравнивания.
@supports (-moz-appearance: none) {
    .UiButton__label {
        transform: translateY(-0.0625em);
    }
}
</style>
