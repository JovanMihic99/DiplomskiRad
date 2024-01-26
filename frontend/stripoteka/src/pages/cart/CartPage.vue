<template>
  <div>
    <h1 class="text-center text-h3 mb-8">The Cart</h1>
    <v-row class="px-15 my-10">
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
          @click="$router.push('/checkout')"
          >Checkout</v-btn
        >
      </v-col>
    </v-row>
    <v-card
      class="ma-3 px-7 py-2"
      elevation="3"
      v-for="item in cartStore.items"
      :key="item._id"
    >
      <cart-item
        class=""
        :title="item.edition + ' ' + item.title + ' (#' + item.issue + ')'"
        imageUrl="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        :price="item.price"
        :quantity="item.quantity"
      ></cart-item>
    </v-card>
    <!-- <v-data-table :items="cartStore.items"></v-data-table> -->
  </div>
</template>
<script>
import { useCartStore } from "@/stores/cart";
import CartItem from "@/components/cart/CartItem.vue";
export default {
  components: { CartItem },
  setup() {
    // const cartStore = useCartStore();
    return { cartStore: useCartStore() };
  },
  computed: {
    title() {
      return this.productsStore();
    },
  },
  async mounted() {
    await this.cartStore.fetchCart();
  },
};
</script>
