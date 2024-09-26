<template>
    <button
        :class="computedClass"
        :style="computedStyle"
        :disabled="disabled"
        @click="handleClick"
        :type="type"
    >
        <slot>
            <custom-icon
                v-if="icon"
                :icon="icon"
                :size="iconSize"
                :icon-color="computedIconColor"
            />
            <span v-if="text !== undefined" :class="{ 'white-space-nowrap': !wrap }">{{
                text
            }}</span>
        </slot>
    </button>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import type { PropType } from "vue";
import CustomIcon from "@/components/custom/CustomIcon.vue";
import { isNavigationFailure, NavigationFailureType } from "vue-router";
import router from "@/router";

const props = defineProps({
    icon: {
        type: String,
        default: "",
    },
    type: {
        type: String as PropType<"button" | "submit" | "reset">,
        default: "button",
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    class: [String, Object, Array],
    style: [String, Object, Array],
    text: {
        type: [String, Number],
        default: "",
    },
    iconSize: {
        type: [String, Number],
        default: 12,
    },
    color: {
        type: String,
        default: "primary",
    },
    to: {
        type: String,
        default: "",
    },
    wrap: {
        type: Boolean,
        default: false,
    },
    iconColor: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(["click"]);

const defaultClass = "custom-button"; // Parent class gelmediğinde kullanılacak default class

const computedIconColor = computed(() => {
    if (props.iconColor) return props.iconColor;
    return "text-black dark:text-white";
});
const computedClass = computed(() => {
    const propClass = props.class;
    return [
        ...(propClass
            ? Array.isArray(propClass)
                ? propClass
                : typeof propClass === "string"
                  ? propClass.split(" ")
                  : Object.keys(propClass)
            : []), // Parent class yoksa fallback class ekleniyor
        colorClass.value,
        defaultClass,
    ];
});

const colorClass = computed((): string => {
    const colorMap: Record<
        "primary" | "danger" | "success" | "warning" | "info" | "transparent",
        string
    > = {
        primary: "bg-blue-500 text-white hover:bg-blue-600 dark:dark-primary-button",
        danger: "bg-red-500 text-white hover:bg-red-600 dark:dark-danger-button",
        success: "bg-green-500 text-white hover:bg-green-600 dark:dark-success-button",
        warning: "bg-yellow-500 text-black hover:bg-yellow-600",
        info: "bg-indigo-500 text-white hover:bg-indigo-600",
        transparent: "bg-transparent text-white hover:bg-transparent",
    };
    return colorMap[props.color as keyof typeof colorMap] || colorMap.primary;
});

const computedStyle = computed(() => {
    const baseStyle =
        typeof props.style === "string" ? parseStyleString(props.style) : props.style || {};

    // Ensure all style properties are strings
    return Object.fromEntries(
        Object.entries(baseStyle).map(([key, value]) => {
            return [key, typeof value === "string" ? value : `${value}`];
        }),
    );
});

async function handleClick(event: Event) {
    if (!props.disabled) {
        await goToLink();
        emit("click", event);
    }
}

const goToLink = async () => {
    if (!props.to) return;

    try {
        await router?.push(props.to);
    } catch (e) {
        if (!isNavigationFailure(e, NavigationFailureType.aborted)) throw e;
    }
};

function parseStyleString(styleString: string | undefined): Record<string, string> {
    return (
        styleString?.split(";").reduce<Record<string, string>>((styles, rule) => {
            const [property, value] = rule.split(":").map((part) => part.trim());
            if (property && value) {
                styles[property] = value;
            }
            return styles;
        }, {}) || {}
    );
}
</script>

<style scoped>
.custom-button {
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.custom-button:disabled {
    cursor: not-allowed;
}

.dark .custom-button {
    color: #f1f1f1;
}

.dark .custom-button:disabled {
    background-color: #444444;
}
</style>
