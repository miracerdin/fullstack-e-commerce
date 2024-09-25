import "./assets/main.css";
import "./primePreset/index.js";

import "primeicons/primeicons.css";
import StyleClass from "primevue/styleclass";

import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import router from "./router";
import Button from "primevue/button";
import Menubar from "primevue/menubar";
import Badge from "primevue/badge";
import InputText from "primevue/inputtext";
import Avatar from "primevue/avatar";
import Card from "primevue/card";

import Aura from "@primevue/themes/aura";

const app = createApp(App);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Button", Button);
app.component("Menubar", Menubar);
app.component("Badge", Badge);
app.component("InputText", InputText);
app.component("Avatar", Avatar);
app.component("Card", Card);

app.use(PrimeVue, {
    theme: {
        preset: Aura, // Use the Aura preset
        options: {
            prefix: "p", // CSS variable prefix, default is 'p'
            darkModeSelector: "system", // Can use class selectors for custom dark mode handling
            cssLayer: false, // Whether to wrap styles in a CSS layer
        },
    },
});
app.use(createPinia());
app.use(router);
app.directive("styleclass", StyleClass);

app.mount("#app");
