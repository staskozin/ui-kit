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
    font-family: inherit;
    display: flex;
    column-gap: .5em;
    border: none;
    border-radius: .25em;

    &.--size-small {
        font-size: .875rem;
        line-height: 1.5em;
        padding: .375em .625em .375em .5em;
        column-gap: .25em;
    }

    &.--size-medium {
        font-size: 1rem;
        line-height: 1.5em;
        padding: .5em 1.25em;

        &.--has-icon {
            padding: .5em .75em;

            &:not(.--has-label) {
                padding: .625em;
            }
        }
    }

    &.--size-large {
        font-size: 1rem;
        line-height: 1.25em;
        padding: .75em 1.5em;
    }
}
</style>