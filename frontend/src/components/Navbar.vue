<script lang="ts" setup>
import {computed, onMounted, ref, shallowRef, watch} from "vue";

import IconClose from "./icons/IconClose.vue";
import IconUser from "../components/icons/IconUser.vue";
import IconMenu from "./icons/IconMenu.vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";

import router from "@/router";
import type {SelectModel} from "@/types/select-model";


const pageList = ref<SelectModel[]>([
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

const isCartModalVisible = shallowRef(false);
const isNavbarCollapsed = shallowRef(true);
const willPush = (page: string): boolean => router.currentRoute.value.name !== page;

const setIsNavbarCollapsed = () => (isNavbarCollapsed.value = true);
const pageChanged = (page: string) => {
  if (willPush(page)) router.push({ name: page });

};

const setCurrentPageIsActive = () => {
  pageList.value?.forEach(
      (page) =>
          (page.selected = page.value?.toString() === router.currentRoute.value.name)
  );
};
const handleOutsideClick = (event: MouseEvent) => {
  if (isNavbarCollapsed.value) return;

  const hasNavbar = (event.target as HTMLElement).closest(".navigation-bar");
  if (!hasNavbar) setIsNavbarCollapsed();
};

const toggleNavbar = () => (isNavbarCollapsed.value = !isNavbarCollapsed.value);

onMounted(() => window.addEventListener("click", handleOutsideClick));

watch(
    () => router.currentRoute.value,
    () => {
      setCurrentPageIsActive();
    },
    { immediate: true }
);
</script>

<template>
  <div
      :class="[
  isNavbarCollapsed
    ? 'w-full min-h-0 transform translate-x-1.5 transition-transform ease-in duration-700 flex'
    : 'w-full min-h-0 transform translate-x-0 transition-transform ease-in duration-700 flex-col',
]"

      class="navigation-bar min-w-[275px] md:w-full md:h-auto justify-between md:items-center fixed top-0 left-0 z-[2] md:px-0 px-2 bg-white dark:bg-gray-800 shadow flex md:flex-row "
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
            class="text-base font-normal font-['Inter'] leading-normal"
            type="button"
            @click="pageChanged(`${page.value}`)"
        >
          {{ page.text }}
        </button>
      </li>
    </ul>
    <div
        :class="{ hidden: !isNavbarCollapsed }"
        class="justify-end items-center gap-4 flex md:flex md:static"
    >
      <div class="w-6 h-6 relative -top-3">
        <ThemeSwitcher />
      </div>
<!--      <div class="md:flex md:flex-row flex-col flex-1 px-3">-->


<!--        <div-->
<!--            class="md:h-6 relative flex-1 md:my-2"-->
<!--            title="Sign Up"-->
<!--            @click="toggleSignInModal(true)"-->
<!--        >-->
<!--          <div-->
<!--              class="dark:text-white text-black hover:opacity-50 hover:cursor-pointer md:flex hidden"-->
<!--          >-->
<!--            <IconUser title="Sign Up" @click="toggleSignInModal(true)" />-->
<!--            <span>{{ currentUser?.displayName }}</span>-->
<!--          </div>-->
<!--          <div class="md:hidden flex align-items-center gap-2">-->
<!--            <Button-->
<!--                class="p-3 w-full text-primary-50 dark:text-white border border-surface-200 dark:border-surface-600 mb-3"-->
<!--                label="Sign Up"-->
<!--            />-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

<!--      <SignInModal-->
<!--          v-if="isSignInModalVisible"-->
<!--          v-model:value="isSignInModalVisible"-->
<!--          @input="toggleSignInModal(false)"-->
<!--          @onShowToast="showToast"-->
<!--      />-->
<!--      <CartSidebar-->
<!--          v-if="isCartModalVisible"-->
<!--          v-model:value="isCartModalVisible"-->
<!--          @input="toggleCartModal(false)"-->
<!--      />-->
      <Toast />
    </div>
  </div>
</template>
