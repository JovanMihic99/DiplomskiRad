<template>
  <h1>The Cart</h1>
  <v-card class="mt-3" v-for="item in cartStore.items" :key="item._id">
    <cart-item
      :title="item.edition"
      imageUrl="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      :price="item.price"
      :quantity="item.quantity"
    ></cart-item>
  </v-card>
  <!-- <v-data-table :items="cartStore.items"></v-data-table> -->
</template>
<script>
import { useCartStore } from "@/stores/cart";
import CartItem from "@/components/cart/CartItem.vue";
export default {
  components: { CartItem },
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  async mounted() {
    await this.cartStore.fetchCart();
  },
};
</script>
