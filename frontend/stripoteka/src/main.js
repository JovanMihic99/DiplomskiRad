import router from "./router";

import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

import { createPinia } from "pinia";
import { useUserStore } from "./stores/user";

import TheHeader from "./components/layout/TheHeader.vue";
import BaseDialog from "./components/UI/BaseDialog.vue";
import TheFooter from "./components/layout/TheFooter.vue";

import DropdownButton from "./components/UI/DropdownButton.vue";

loadFonts();

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(createPinia());

//Initialize login state from local storage
const userStore = useUserStore();
try {
  userStore.initializeFromStorage();
} catch (error) {
  console.log(error);
}

app.component("the-header", TheHeader);
app.component("the-footer", TheFooter);
app.component("dropdown-button", DropdownButton);
app.component("base-dialog", BaseDialog);

app.mount("#app");
