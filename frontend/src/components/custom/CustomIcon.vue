<template>
    <i class="pi" :class="icon" :style="computedStyle"></i>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
    icon: {
        type: String,
        default: "",
    },
    style: {
        type: Object,
        default: () => {
            return {};
        },
    },
    size: {
        type: Number,
        default: 12,
    },
});

const computedStyle = computed(() => {
    return {
        ...props.style, // Kullanıcıdan gelen stil
        fontSize: `${props.size}px`, // Dinamik font-size
        padding: props.style.padding || "4px",
    };
});
</script>
