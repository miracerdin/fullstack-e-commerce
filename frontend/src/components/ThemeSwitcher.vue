<template>
  <div class="flex justify-end p-2 hover:opacity-50">
    <ul class="flex list-none m-0 p-0 gap-2 items-center">
      <li class="relative">
        <button
            class="inline-flex border-1 w-8 h-8 p-0 items-center justify-center surface-0 dark:surface-800 border border-surface-200 dark:border-surface-600 rounded"
            type="button"
            @click="onThemeToggler"
        >
          <i :class="`dark:text-white pi ${iconClass}`" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const iconClass = ref("pi-moon");

const setSystemTheme = () => {
  const root = document.getElementsByTagName("html")[0];
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.classList.toggle("dark");
    iconClass.value = iconClass.value === "pi-moon" ? "pi-sun" : "pi-moon";
  }
};
setSystemTheme();

const onThemeToggler = () => {
  const root = document.getElementsByTagName("html")[0];

  root.classList.toggle("dark");
  iconClass.value = iconClass.value === "pi-moon" ? "pi-sun" : "pi-moon";
};
</script>
