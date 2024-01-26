<template>
  <nav>
    <v-navigation-drawer
      v-if="isLoggedIn"
      app
      v-model="sidebarIsOpen"
      location="right"
    >
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          :title="userStore.name"
          :subtitle="userStore.email"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav class="listbox">
        <v-list-item
          @click="$router.push('/')"
          prepend-icon="mdi-home"
          title="Homepage"
          value="homepage"
        ></v-list-item>
        <v-list-item
          @click="$router.push('/cart')"
          prepend-icon="mdi-cart"
          title="My Cart"
          value="cart"
        ></v-list-item>
        <v-list-item
          @click="$router.push('/account')"
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
          @click="logout()"
          class="btn-logout"
          prepend-icon="mdi-logout"
          title="Log Out"
          value="logout"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :elevation="2" app>
      <v-app-bar-title>
        <span>Stripoteka</span>
      </v-app-bar-title>
      <dropdown-button
        :items="[
          { title: 'kurac', to: '/kurac' },
          { title: 'palac', to: '/palac' },
        ]"
        >Stripovi</dropdown-button
      >

      <v-spacer></v-spacer>

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
  },
  methods: {
    logout() {
      return true;
    },
  },
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
