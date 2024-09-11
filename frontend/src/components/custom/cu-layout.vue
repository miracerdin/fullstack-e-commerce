<template>
    <div
        :class="[
            {
                'flex-row': row,
                'flex-column': column,
                'flex-wrap': wrap,
                'align-items-center': alignItemsCenter || centerAll,
                'align-items-end': alignItemsEnd,
                'align-items-start': alignItemsStart,
                'align-items-stretch': alignItemsStretch,
                'justify-content-center': justifyContentCenter || centerAll,
                'justify-content-end': justifyContentEnd,
                'justify-content-start': justifyContentStart,
                'justify-content-between': justifyContentBetween,
                'justify-content-around': justifyContentAround,
            },
            gutter ? `co-gutter__${gutter}` : '',
            $attrs.class || '',
        ]"
        :style="($attrs.style || {}) as StyleValue"
        class="d-flex"
        v-bind="$attrs"
    >
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { type StyleValue, useAttrs } from "vue";

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
