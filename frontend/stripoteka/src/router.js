import { createRouter, createWebHistory } from "vue-router";

// import { useUserStore } from "./stores/user";

// import HomePage from "./pages/HomePage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";
import CartPage from "./pages/cart/CartPage.vue";
import AccountPage from "./pages/user/AccountPage.vue";
import LoginPage from "./pages/user/LoginPage.vue";
import SignupPage from "./pages/user/SignupPage.vue";
import CheckoutPage from "./pages/checkout/CheckoutPage.vue";
import OrdersList from "./pages/user/OrdersList.vue";

import ProductList from "./pages/product/ProductList.vue";
import ProductDetailsPage from "./pages/product/ProductDetailsPage.vue";

import AddProductPage from "./pages/admin/AddProductPage.vue";
import AdminProductListPage from "./pages/admin/AdminProductListPage.vue";

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
      path: "/products/:id",
      component: ProductDetailsPage,
    },
    {
      path: "/register",
      component: SignupPage,
    },

    {
      path: "/admin",
      // beforeEnter:  () => {
      //   const userStore =  useUserStore();

      //   if (userStore.role !== "admin") {
      //     console.log(userStore.role);
      //     return false;
      //   } else {
      //     return true;
      //   }
      // },
      children: [
        {
          path: "add-product",
          component: AddProductPage,
        },
        {
          path: "products",
          component: AdminProductListPage,
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
