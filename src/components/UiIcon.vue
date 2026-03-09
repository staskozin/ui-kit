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
import { UiElementSize } from '../types';

// Props
type UiIconProps = {
    name: 'calendar';
    size?: UiElementSize;
};

const { size = UiElementSize.Medium } = defineProps<UiIconProps>();

// Computed
const classList = computed(() => {
    return [`--size-${size}`];
});
</script>

<style lang="scss">
.UiIcon {
    &.--size-small {
        width: px(16);
        height: px(16);
    }

    &.--size-medium {
        width: px(20);
        height: px(20);
    }
}
</style>
