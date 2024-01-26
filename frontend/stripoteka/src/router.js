import { createRouter, createWebHistory } from "vue-router";

// import HomePage from "./pages/HomePage.vue";
import CartPage from "./pages/cart/CartPage.vue";
import AccountPage from "./pages/user/AccountPage.vue";
import LoginPage from "./pages/user/LoginPage.vue";
import ProductList from "./pages/product/ProductList.vue";
import SignupPage from "./pages/user/SignupPage.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: ProductList,
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
    {
      path: "/products",
      component: ProductList,
    },
    {
      path: "/register",
      component: SignupPage,
    },
  ],
});

export default router;
