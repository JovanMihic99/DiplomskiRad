import router from "./router";

import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

import { createPinia } from "pinia";

import TheHeader from "./components/layout/TheHeader.vue";
import TheSidebar from "./components/layout/TheSidebar.vue";
import TheFooter from "./components/layout/TheFooter.vue";

import DropdownButton from "./components/UI/DropdownButton.vue";

loadFonts();

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(createPinia());

app.component("the-header", TheHeader);
app.component("the-sidebar", TheSidebar);
app.component("the-footer", TheFooter);

app.component("dropdown-button", DropdownButton);

app.mount("#app");
