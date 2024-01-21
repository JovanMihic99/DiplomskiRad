import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import CartPage from "./pages/CartPage.vue";
import AccountPage from "./pages/AccountPage.vue";
import LoginPage from "./pages/LoginPage.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/cart",
      component: CartPage,
    },
    {
      path: "/account",
      component: AccountPage,
    },
    {
      path: "/login",
      component: LoginPage,
    },
  ],
});

export default router;
