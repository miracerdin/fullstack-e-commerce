import "./assets/main.css";
import "./primePreset/index.js";

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

import "primeicons/primeicons.css";
import StyleClass from "primevue/styleclass";
import { PrimePreset } from "@/primePreset/index";

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
        unstyled: true,
        pt: PrimePreset,
    },
});
app.use(createPinia());
app.use(router);
app.directive("styleclass", StyleClass);

app.mount("#app");
