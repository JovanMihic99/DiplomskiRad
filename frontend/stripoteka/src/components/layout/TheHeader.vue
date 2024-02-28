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
        <dropdown-button
          class="w-100 mx-auto"
          color="secondary"
          v-if="isAdmin"
          :items="[
            { title: 'Stripovi', to: '/admin/products' },
            { title: 'Dodaj Strip', to: '/admin/add-product' },
            { title: 'Porudžbine', to: '/admin/orders' },
          ]"
          >Admin Panel
        </dropdown-button>
        <v-list-item
          @click="$router.push('/')"
          prepend-icon="mdi-home"
          title="Početna"
        ></v-list-item>
        <v-list-item
          @click="$router.push('/user/orders')"
          prepend-icon="mdi-truck-delivery-outline"
          title="Moje porudžbine"
        >
        </v-list-item>
        <v-list-item
          @click="$router.push('/user/cart')"
          prepend-icon="mdi-cart"
          title="Moja korpa"
        >
        </v-list-item>

        <v-spacer></v-spacer>
        <v-list-item
          @click="logout"
          class="btn-logout"
          prepend-icon="mdi-logout"
          title="Izloguj se"
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
import { useCartStore } from "@/stores/cart";
import DropdownButton from "../UI/DropdownButton.vue";
export default {
  setup() {
    const userStore = useUserStore();
    const cartStore = useCartStore();
    return { userStore, cartStore };
  },
  data() {
    return {
      sidebarIsOpen: false,
    };
  },
  computed: {
    cartItemCount() {
      let itemsCount = 0;
      this.cartStore.items.forEach((item) => {
        itemsCount += item.quantity;
      });
      return itemsCount;
    },
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
  mounted() {
    this.cartStore.getCart();
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
