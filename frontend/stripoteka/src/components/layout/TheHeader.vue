<template>
  <nav>
    <v-navigation-drawer
      v-if="isLoggedIn"
      app
      v-model="sidebarIsOpen"
      location="right"
    >
      <v-list v-if="isLoggedIn">
        <v-list-item
          :prepend-avatar="'https://ui-avatars.com/api/?name=' + userStore.name"
          :title="userStore.name"
          :subtitle="userStore.email"
          :append-icon="isAdmin ? 'mdi-security' : null"
        >
        </v-list-item>
      </v-list>
      <v-divider></v-divider>

      <v-list density="compact" nav class="listbox">
        <v-list-item prepend-icon="mdi-security" v-if="isAdmin">
          <dropdown-button
            class="w-100"
            v-if="isAdmin"
            :items="[
              { title: 'Stripovi', to: '/admin/products' },
              { title: 'Dodaj Strip', to: '/admin/add-product' },
              { title: 'Porudžbine', to: '/admin/orders' },
            ]"
            >Admin Panel</dropdown-button
          >
        </v-list-item>
        <v-list-item prepend-icon="mdi-bookshelf">
          <dropdown-button
            :items="[
              { title: 'cart', to: '/user/cart' },
              { title: 'orders', to: '/user/orders' },
            ]"
            >Stripovi
          </dropdown-button>
        </v-list-item>
        <v-list-item
          @click="$router.push('/')"
          prepend-icon="mdi-home"
          title="Homepage"
          value="homepage"
        ></v-list-item>

        <v-list-item
          @click="$router.push('/user/cart')"
          prepend-icon="mdi-cart"
          title="My Cart"
          value="cart"
        >
        </v-list-item>

        <v-list-item
          @click="$router.push('/user/account')"
          prepend-icon="mdi-account-circle"
          title="My Account"
          value="account"
        ></v-list-item>
        <v-list-item
          @click="$router.push('/wishlist')"
          prepend-icon="mdi-star"
          title="Wishlist"
          value="wishlist"
        ></v-list-item>
        <v-spacer></v-spacer>
        <v-list-item
          @click="logout"
          class="btn-logout"
          prepend-icon="mdi-logout"
          title="Log Out"
          value="logout"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :elevation="2" app>
      <v-list v-if="isLoggedIn">
        <v-list-item
          :prepend-avatar="'https://ui-avatars.com/api/?name=' + userStore.name"
          :title="userStore.name"
          :subtitle="userStore.email"
          :append-icon="isAdmin ? 'mdi-security' : null"
        >
        </v-list-item>
      </v-list>

      <v-app-bar-title>
        <span>Stripoteka</span>
      </v-app-bar-title>

      <v-app-bar-nav-icon
        v-if="isLoggedIn"
        @click="sidebarIsOpen = !sidebarIsOpen"
      ></v-app-bar-nav-icon>
      <v-btn
        v-else
        :disabled="this.$route.path === '/login' ? true : false"
        @click="$router.push('/login')"
        class="bg-blue"
        elevation="1"
        >Login</v-btn
      >
    </v-app-bar>
  </nav>
</template>
<script>
import { useUserStore } from "@/stores/user";
import DropdownButton from "../UI/DropdownButton.vue";
export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      sidebarIsOpen: false,
    };
  },
  computed: {
    isLoggedIn() {
      if (this.userStore._id) return true;
      else return false;
    },
    isAdmin() {
      if (this.userStore.role === "admin") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    async logout() {
      await this.userStore.logout();
      this.$router.go("/");
      return true;
    },
  },
  components: { DropdownButton },
};
</script>
<style lang="css" scoped>
/* .btn-logout {
  position: absolute;
  bottom: 10%;
}
.listbox {
  height: 100%;
} */
</style>
