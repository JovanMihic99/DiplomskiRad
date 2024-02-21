<template>
  <div>
    <h1 class="text-center text-h3 mb-8">Moja Korpa</h1>
    <div v-if="!cartStore.items.length">
      <h2 class="text-center">Vaša korpa je prazna!</h2>
      <p class="text-center mt-3">
        Posetite našu <router-link to="/products">početnu</router-link> stranicu
        da bi ste dodali stripove u vašu korpu!
      </p>
    </div>

    <v-card
      v-else
      class="ma-3 pa-0"
      elevation="3"
      v-for="item in cartStore.items"
      :key="item._id"
      color="grey-darken-3"
    >
      <cart-item
        class="mx-auto"
        :title="item.edition + ' - ' + item.title + ' br. ' + item.issue"
        :imageUrl="API_URL + '/' + item.imageUrl"
        :price="item.price"
        :quantity="item.quantity"
        :_id="item._id"
        @cartChanged="refreshCart"
      ></cart-item>
    </v-card>
    <v-row cols="12" v-if="isLoading">
      <v-progress-linear color="primary" indeterminate></v-progress-linear>
    </v-row>
    <v-row v-else class="px-15 my-10">
      <v-col md="6" cols="12">
        <p class="text-h6 font-weight-bold">
          Ukupna cena:
          {{ cartStore.totalPrice }}rsd.
        </p>
      </v-col>
      <v-col md="6" cols="12" align="center">
        <v-btn
          color="green"
          prependIcon="mdi-cart"
          @click="$router.push('/user/checkout')"
        >
          Checkout
        </v-btn>
      </v-col>
    </v-row>
    <!-- <v-data-table :items="cartStore.items"></v-data-table> -->
  </div>
</template>
<script>
import config from "../../config";
import { useCartStore } from "@/stores/cart";
import CartItem from "./CartItem.vue";
export default {
  components: { CartItem },
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  data() {
    return {
      API_URL: config.API_URL,
      isLoading: false,
    };
  },
  computed: {
    title() {
      return this.productsStore();
    },
  },
  methods: {
    async refreshCart() {
      this.isLoading = true;
      await this.cartStore.getCart();
      this.isLoading = false;
    },
  },
  async mounted() {
    await this.refreshCart();
  },
};
</script>
