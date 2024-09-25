<template>
    <div class="grid-wrap bg-white dark:bg-gray-800 pt-4">
        <div v-for="product in products" :key="product.id" class="product-item">
            <img :src="product.imageUrl" :alt="product.name" />
            <h2 class="product-name text-black dark:text-white">{{ product.name }}</h2>
            <p class="text-black dark:text-white">${{ product.price }}</p>
            <div>
                <custom-button text="View Detail" :to="'/products/' + product.id" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { products } from "../fake-data";
import { onMounted } from "vue";
import CustomButton from "@/components/custom/CustomButton.vue";

onMounted(() => {
    console.log(products);
});
</script>
<style scoped>
.grid-wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    max-width: 70%;
}

.product-item {
    align-items: center;
    border-radius: 8px;
    box-shadow: 0px 2px 5px #888;
    display: flex;
    flex-direction: column;
    margin-bottom: 2%;
    padding: 20px;
    position: relative;
    width: 32%;
}

.product-name {
    margin-bottom: 0;
}

img {
    height: 200px;
    width: 200px;
}

a {
    width: 100%;
}
</style>
