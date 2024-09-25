<template>
    <i class="pi bg-transparent" :class="`${icon} ${iconColor}`" :style="computedStyle"></i>
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
    iconColor: {
        type: String,
        default: "",
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
