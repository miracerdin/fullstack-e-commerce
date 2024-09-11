import { createRouter, createWebHistory } from "vue-router";
import ProductsPage from "@/views/ProductsPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/products",
            name: "products",
            component: ProductsPage,
        },
        {
            path: "/products/:id",
            name: "productDetail",
            component: () => import("@/views/ProductPageDetail.vue"),
        },
        {
            path: "/cart",
            name: "cart",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("@/views/CartPage.vue"),
        },

        {
            path: "/contact",
            name: "contact",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/ContactPage.vue"),
        },
        {
            path: "/",
            redirect: "/products",
        },
    ],
});

export default router;
