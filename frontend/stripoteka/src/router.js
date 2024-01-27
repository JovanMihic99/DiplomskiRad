import { createRouter, createWebHistory } from "vue-router";

// import HomePage from "./pages/HomePage.vue";
import CartPage from "./pages/cart/CartPage.vue";
import AccountPage from "./pages/user/AccountPage.vue";
import LoginPage from "./pages/user/LoginPage.vue";
import ProductList from "./pages/product/ProductList.vue";
import SignupPage from "./pages/user/SignupPage.vue";
import CheckoutPage from "./pages/checkout/CheckoutPage.vue";
import AddProductPage from "./pages/product/AddProductPage.vue";
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
    {
      path: "/checkout",
      component: CheckoutPage,
    },
    {
      path: "/admin",
      component: AddProductPage,
      children: [
        {
          path: "/add-product",
          component: AddProductPage,
        },
      ],
    },
  ],
});

export default router;
