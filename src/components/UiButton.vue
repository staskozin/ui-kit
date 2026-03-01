<template>
    <button
        :class="classList"
        class="UiButton"
    >
        {{ label }}
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { UiElementSize } from '../types';

const {
    label,
    size = 'medium'
} = defineProps<UiButtonProps>();

const classList = computed(() => {
    return [
        `--size-${size}`
    ]
})

type UiButtonProps = {
    label?: string
    icon?: string
    size: UiElementSize
}
</script>

<style lang="scss">
.UiButton {
    font-family: inherit;
    display: flex;
    column-gap: 0.5em;

    &.--size-small {
        font-size: 1rem;
        line-height: 1.5em;
        padding: .375em 0.625em .375em 0.5em;
    }

    &.--size-medium {
        font-size: 1rem;
    }

    &.--size-large {
        font-size: 1rem;
    }
}
</style>