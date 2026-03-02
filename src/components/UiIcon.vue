<template>
    <div
        :class="classList"
        class="UiIcon"
        v-html="Icons[name]"
    ></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Icons from '../assets/icons';
import type { UiElementSize } from '../types';

// Props
type UiIconProps = {
    name: 'calendar'
    size?: UiElementSize
}

const {
    size = 'medium',
} = defineProps<UiIconProps>();

// Computed
const classList = computed(() => {
    return [
        `--size-${size}`,
    ]
});
</script>

<style lang="scss">
.UiIcon {
    &.--size-small {
        width: 1rem;
        height: 1rem;
    }

    &.--size-medium {
        width: 1.25rem;
        height: 1.25rem;
    }
}
</style>