<template>
    <custom-layout column id="page-wrap">
        <h1 class="text-4xl font-bold border-b border-transparent dark:border-white">
            Shopping Cart
        </h1>
        <div v-for="product in cartItems" :key="product.id" class="product-container">
            <img class="product-image" :src="product.imageUrl" :alt="product.name" />
            <div class="details-wrap">
                <h3>{{ product.name }}</h3>
                <p class="product-price">${{ product.price }}</p>
            </div>
            <div class="flex justify-center items-center">
                <custom-button
                    icon-color="text-white"
                    text="Remove"
                    icon="pi-trash"
                    icon-size="12"
                    color="danger"
                />
            </div>
        </div>
        <h3 id="total-price">Total Price: ${{ totalPrice }}</h3>

        <custom-button
            text="Proceed to Checkout"
            icon="pi-check-circle"
            icon-size="12"
            icon-color="text-white"
            color="success"
        />
    </custom-layout>
</template>
<script setup lang="ts">
import { cartItems } from "@/fake-data";
import { computed } from "vue";
import CustomLayout from "@/components/custom/custom-layout.vue";
import CustomButton from "@/components/custom/CustomButton.vue";

const totalPrice = computed(() => cartItems.reduce((sum, item) => sum + Number(item.price), 0));
</script>
<style scoped>
h1 {
    border-bottom: 1px solid black;
    margin: 0;
    margin-top: 16px;
    padding: 16px;
}

#total-price {
    padding: 16px;
    text-align: right;
}

#checkout-button {
    width: 100%;
}

.product-container {
    align-content: "center";
    border-bottom: 1px solid #ddd;
    display: flex;
    padding: 16px;
    width: 100%;
}

.product-image {
    flex: 1;
    height: 100px;
    max-width: 100px;
}

.details-wrap {
    padding: 0 16px;
    flex: 3;
}

.remove-button {
    flex: 1;
    margin: auto;
}
#page-wrap {
    width: 60%;
}
</style>
