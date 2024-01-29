<template>
  <div>
    <h1 class="text-center text-h3 mb-8">The Cart</h1>
    <div v-if="!cartStore.items.length">
      <h2 class="text-center">Your cart is empty!</h2>
      <p class="text-center mt-3">
        Visit our <router-link to="/products">Products</router-link> page to add
        some items to your cart!
      </p>
    </div>
    <v-row v-else class="px-15 my-10">
      <v-col md="6" cols="12">
        <p class="text-h6 font-weight-bold">
          Ukupna cena:
          {{ cartStore.totalPrice }}rsd.
        </p>
      </v-col>
      <v-col md="6" cols="12" align="right">
        <v-btn
          color="green"
          prependIcon="mdi-cart"
          @click="$router.push('/user/checkout')"
        >
          Checkout
        </v-btn>
      </v-col>
    </v-row>

    <v-card
      class="ma-3 px-7 py-2"
      elevation="3"
      v-for="item in cartStore.items"
      :key="item._id"
      color="blue-darken-3"
    >
      <cart-item
        :title="item.edition + ' ' + item.title + ' (#' + item.issue + ')'"
        imageUrl="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        :price="item.price"
        :quantity="item.quantity"
        :_id="item._id"
        @cartChanged="refreshCart"
      ></cart-item>
    </v-card>
    <!-- <v-data-table :items="cartStore.items"></v-data-table> -->
  </div>
</template>
<script>
import { useCartStore } from "@/stores/cart";
import CartItem from "./CartItem.vue";
export default {
  components: { CartItem },
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  computed: {
    title() {
      return this.productsStore();
    },
  },
  methods: {
    async refreshCart() {
      await this.cartStore.getCart();
    },
  },
  async mounted() {
    this.refreshCart();
  },
};
</script>
