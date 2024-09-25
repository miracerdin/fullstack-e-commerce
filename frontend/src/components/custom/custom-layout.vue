<template>
    <div
        :class="[
            {
                'flex flex-row': row,
                'flex-col': column,
                'flex-wrap': wrap,
                'items-center': alignItemsCenter || centerAll,
                'items-end': alignItemsEnd,
                'items-start': alignItemsStart,
                'items-stretch': alignItemsStretch,
                'justify-center': justifyContentCenter || centerAll,
                'justify-end': justifyContentEnd,
                'justify-start': justifyContentStart,
                'justify-between': justifyContentBetween,
                'justify-around': justifyContentAround,
            },
            $attrs.class || '',
        ]"
        :style="$attrs.style"
        v-bind="$attrs"
        class="flex text-black dark:text-white"
    >
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { useAttrs } from "vue";

const props = defineProps({
    row: { type: Boolean, default: false },
    column: { type: Boolean, default: false },
    wrap: { type: Boolean, default: false },
    alignItemsCenter: { type: Boolean, default: false },
    alignItemsEnd: { type: Boolean, default: false },
    alignItemsStart: { type: Boolean, default: false },
    alignItemsStretch: { type: Boolean, default: false },
    justifyContentCenter: { type: Boolean, default: false },
    justifyContentEnd: { type: Boolean, default: false },
    justifyContentStart: { type: Boolean, default: false },
    justifyContentBetween: { type: Boolean, default: false },
    justifyContentAround: { type: Boolean, default: false },
    centerAll: { type: Boolean, default: false },
    gutter: { type: String, default: "" },
});

const $attrs = useAttrs();
</script>
