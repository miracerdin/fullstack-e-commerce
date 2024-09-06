<template>
    <div class="flex items-center justify-center text-black dark:text-white">
        <div id="page-wrap" class="bg-white dark:bg-gray-800">
            <div id="img-wrap">
                <img :src="selectedProduct.imageUrl" :alt="selectedProduct.name" />
            </div>
            <div id="product-details">
                <h1>{{ selectedProduct.name }}</h1>
                <h3 id="price">${{ selectedProduct.price }}</h3>
                <p>Average rating: {{ selectedProduct.averageRating }}</p>
                <button id="add-to-cart" @click="addToCart">Add to Cart</button>
                <h4>Description</h4>
                <p>{{ selectedProduct.description }}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { products } from "../fake-data";
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const selectedProduct = computed(() => products.find((p) => p.id === route.params.id));
</script>
<style scoped>
#page-wrap {
    margin-top: 16px;
    padding: 16px;
    max-width: 600px;
    box-sizing: border-box;
}

#img-wrap {
    display: flex;
    justify-content: center;
}

img {
    width: 60%;
}

#product-details {
    padding: 16px;
    position: relative;
}

#add-to-cart {
    width: 100%;
}

#price {
    position: absolute;
    top: 24px;
    right: 16px;
}
</style>
