import router from "./router";

import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

import TheHeader from "./components/layout/TheHeader.vue";
import TheSidebar from "./components/layout/TheSidebar.vue";

loadFonts();

const app = createApp(App);

app.use(router);
app.use(vuetify);

app.component("the-header", TheHeader);
app.component("the-sidebar", TheSidebar);

app.mount("#app");
