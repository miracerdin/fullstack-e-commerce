<template>
    <button
        :class="computedClass"
        :style="computedStyle"
        :disabled="disabled"
        @click="handleClick"
        :type="type"
    >
        <slot>
            <custom-icon v-if="icon" :icon="icon" :size="iconSize" />
            <span v-if="text !== undefined" :class="{ 'white-space-nowrap': !wrap }">{{
                text
            }}</span>
        </slot>
    </button>
</template>

<script setup>
import { computed } from "vue";
import CustomIcon from "@/components/custom/CustomIcon.vue";
import { isNavigationFailure, NavigationFailureType } from "vue-router";
import router from "@/router";

const props = defineProps({
    label: {
        type: String,
        default: "",
    },
    icon: {
        type: String,
        default: "",
    },
    type: {
        type: String,
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
        type: Number,
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
});

const emit = defineEmits(["click"]);

const defaultClass = "custom-button"; // Parent class gelmediğinde kullanılacak default class

const goToLink = async () => {
    console.log("to", props.to);
    if (!props.to) return;

    try {
        await router?.push(props.to);
    } catch (e) {
        if (!isNavigationFailure(e, NavigationFailureType.aborted)) throw e;
    }
};

const computedClass = computed(() => {
    const propClass = props.class;
    return [
        defaultClass,
        ...(propClass
            ? Array.isArray(propClass)
                ? propClass
                : typeof propClass === "string"
                  ? propClass.split(" ")
                  : Object.keys(propClass)
            : []), // Parent class yoksa fallback class ekleniyor
        colorClass.value,
    ];
});

const colorClass = computed(() => {
    const colorMap = {
        primary: "bg-blue-500 text-white hover:bg-blue-600 dark:dark-primary-button",
        danger: "bg-red-500 text-white hover:bg-red-600 dark:dark-danger-button",
        success: "bg-green-500 text-white hover:bg-green-600",
        warning: "bg-yellow-500 text-black hover:bg-yellow-600",
        info: "bg-indigo-500 text-white hover:bg-indigo-600",
    };
    return colorMap[props.color] || colorMap.primary;
});

const computedStyle = computed(() => {
    const baseStyle = {
        ...(typeof props.style === "string" ? parseStyleString(props.style) : props.style),
    };

    const importantStyle = Object.fromEntries(
        Object.entries(baseStyle).map(([key, value]) => [key, `${value} !important`]),
    );

    return importantStyle;
});

async function handleClick(event) {
    if (!props.disabled) {
        await goToLink();
        emit("click", event);
    }
}

function parseStyleString(styleString) {
    return styleString.split(";").reduce((styles, rule) => {
        const [property, value] = rule.split(":").map((part) => part.trim());
        if (property && value) {
            styles[property] = value;
        }
        return styles;
    }, {});
}
</script>

<style scoped>
.custom-button {
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
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
