<script lang="ts" setup>
import { onMounted, ref, shallowRef, watch } from "vue";

import IconClose from "./icons/IconClose.vue";
import IconMenu from "./icons/IconMenu.vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";

import router from "@/router";
import type { SelectModel } from "@/types/select-model";
import CustomButton from "@/components/custom/CustomButton.vue";

const pageList = ref<SelectModel<string>[]>([
    {
        text: "Products",
        value: "products",
        selected: true,
    },
    {
        text: "Cart Page",
        value: "cart",
        selected: false,
    },
    {
        text: "Contact Us",
        value: "contact",
        selected: false,
    },
]);

const isNavbarCollapsed = shallowRef(true);
const willPush = (page: string): boolean => router.currentRoute.value.name !== page;

const setIsNavbarCollapsed = () => (isNavbarCollapsed.value = true);
const pageChanged = (page: string) => {
    if (willPush(page)) router.push({ name: page });

    toggleNavbar();
};

const setCurrentPageIsActive = () => {
    pageList.value?.forEach(
        (page) => (page.selected = page.value?.toString() === router.currentRoute.value.name),
    );
};
const handleOutsideClick = (event: MouseEvent) => {
    if (isNavbarCollapsed.value) return;

    const hasNavbar = (event.target as HTMLElement).closest(".navigation-bar");
    if (!hasNavbar) setIsNavbarCollapsed();
};

const toggleNavbar = () => (isNavbarCollapsed.value = !isNavbarCollapsed.value);
const gotToLink = (link: string) => {
    if (willPush(link)) router.push({ name: link });
};
onMounted(() => window.addEventListener("click", handleOutsideClick));

watch(
    () => router.currentRoute.value,
    () => {
        setCurrentPageIsActive();
    },
    { immediate: true },
);
</script>
<template>
    <div
        :class="[
            isNavbarCollapsed
                ? 'w-full min-h-0 transform translate-x-0 transition-transform ease-in duration-700 flex'
                : 'w-full min-h-0 transform translate-x-0 transition-transform ease-in duration-700 flex-col',
        ]"
        class="navigation-bar min-w-[275px] md:w-full md:h-auto justify-between md:items-center fixed top-0 left-0 z-[2] md:px-0 px-2 bg-white dark:bg-gray-800 shadow flex md:flex-row"
        @click.stop="handleOutsideClick"
    >
        <div class="m-2 flex flex-row">
            <span class="relative md:hidden right-4 pt-3 text-black dark:text-white">
                <IconMenu
                    v-if="isNavbarCollapsed"
                    class="cursor-pointer"
                    @click.stop="toggleNavbar()"
                />
                <IconClose v-else class="cursor-pointer" @click.stop="toggleNavbar()" />
            </span>
        </div>

        <ul
            :class="{ hidden: isNavbarCollapsed }"
            class="md:flex md:items-center md:justify-center md:gap-10 md:px-0 px-3 md:pb-0 pb-10 md:static md:w-auto w-full flex-1"
        >
            <li
                v-for="page in pageList"
                :key="page.value"
                :class="{
                    'border-black': page.selected,
                    'border-slate-400': !page.selected,
                    'hover:text-slate-700 hover:dark:text-slate-300': !page.disabled,
                }"
                class="justify-start items-center gap-0.5 my-6 flex"
            >
                <button
                    :class="page.selected ? 'text-black dark:text-white' : 'text-slate-400'"
                    :disabled="page.disabled"
                    class="text-base font-normal leading-normal"
                    type="button"
                    @click="pageChanged(page.value)"
                >
                    {{ page.text }}
                </button>
            </li>
        </ul>

        <div
            :class="{ hidden: !isNavbarCollapsed }"
            class="justify-end items-center gap-4 flex md:flex md:static"
        >
            <div class="w-6 h-6 -top-3 cursor-pointer">
                <ThemeSwitcher />
            </div>
            <div class="w-6 h-6 cursor-pointer">
                <custom-button
                    type="button"
                    @click="gotToLink('profile')"
                    icon="pi-user"
                    color="transparent"
                />
            </div>
            <div class="w-6 h-6 cursor-pointer">
                <custom-button
                    type="button"
                    @click="gotToLink('cart')"
                    icon="pi-shopping-bag"
                    color="transparent"
                />
            </div>
            <Toast />
        </div>
    </div>
</template>
