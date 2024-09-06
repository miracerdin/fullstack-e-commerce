<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import CuPageLayout from "@/components/custom/cu-page-layout.vue";
</script>

<template>
    <cu-page-layout>
        <template #header>
            <Navbar />
        </template>
        <div class="content-container dark:bg-gray-800 bg-white">
            <RouterView />
        </div>
    </cu-page-layout>
</template>

<style scoped>
.content-container {
    display: flex;
    min-height: 100vh;
    justify-content: center;
    width: 100vw;
    flex: 1; /* Allow this to take up the remaining space */
    overflow-y: auto; /* If content overflows, it will be scrollable */
    padding-top: 63px; /* Add padding to prevent overlap if needed */
}
</style>
