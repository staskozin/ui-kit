<template>
    <button
        :class="classList"
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
    label?: string
    icon?: 'calendar'
    size?: UiElementSize
};

const {
    label,
    icon,
    size = 'medium'
} = defineProps<UiButtonProps>();

// Computed
const classList = computed(() => {
    return [
        `--size-${size}`,
        ...icon ? ['--has-icon'] : [],
        ...label ? ['--has-label'] : [],
    ]
});

const iconSize = computed(() => {
    return size !== 'large' ? size : 'medium';
});
</script>

<style lang="scss">
.UiButton {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
    display: flex;
    column-gap: px(8);
    border: none;
    border-radius: px(4);

    &.--size-small {
        font-size: px(14);
        line-height: px(20);
        padding: px(5) px(14) px(7) px(14);
        column-gap: px(4);
    }

    &.--size-medium {
        font-size: px(16);
        line-height: px(24);
        padding: px(8) px(20);

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
</style>