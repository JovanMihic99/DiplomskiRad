import { createRouter, createWebHistory } from "vue-router";

// import HomePage from "./pages/HomePage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";
import CartPage from "./pages/cart/CartPage.vue";
import AccountPage from "./pages/user/AccountPage.vue";
import LoginPage from "./pages/user/LoginPage.vue";
import ProductList from "./pages/product/ProductList.vue";
import SignupPage from "./pages/user/SignupPage.vue";
import CheckoutPage from "./pages/checkout/CheckoutPage.vue";
import AddProductPage from "./pages/product/AddProductPage.vue";
import OrdersList from "./pages/user/OrdersList.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: ProductList,
    },
    {
      path: "/user",
      beforeEnter: () => {
        // reject navigation if user is not logged in
        if (!localStorage.getItem("loggedInUser")) {
          return false;
        }
      },
      children: [
        {
          path: "cart",
          component: CartPage,
        },
        {
          path: "checkout",
          component: CheckoutPage,
        },
        {
          path: "orders",
          component: OrdersList,
        },
        {
          path: "account",
          component: AccountPage,
        },
      ],
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
      path: "/admin",
      component: AddProductPage,
      children: [
        {
          path: "/add-product",
          component: AddProductPage,
        },
      ],
    },
    {
      name: "not-found",
      path: "/:catchAll(.*)",
      component: NotFoundPage,
    },
  ],
});

export default router;
