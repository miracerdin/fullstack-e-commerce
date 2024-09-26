<template>
    <div class="flex justify-center items-center hover:opacity-50">
        <ul class="flex list-none m-0 p-0 items-center">
            <li>
                <custom-button
                    type="button"
                    @click="onThemeToggler"
                    :icon="iconClass"
                    color="transparent"
                    class="p-0"
                />
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import CustomButton from "@/components/custom/CustomButton.vue";
const iconClass = ref("pi-moon");

onMounted(() => {
    setSystemTheme();
});
const setSystemTheme = () => {
    const root = document.getElementsByTagName("html")[0];
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.toggle("dark");
        iconClass.value = iconClass.value === "pi-moon" ? "pi-sun" : "pi-moon";
    }
};

const onThemeToggler = () => {
    const root = document.getElementsByTagName("html")[0];

    root.classList.toggle("dark");
    iconClass.value = iconClass.value === "pi-moon" ? "pi-sun" : "pi-moon";
};
</script>
