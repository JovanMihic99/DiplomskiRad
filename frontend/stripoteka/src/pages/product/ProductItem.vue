<template>
  <v-card class="mx-auto" max-width="344">
    <v-img
      class="product-image"
      @click="productDetails(_id)"
      :src="'http://localhost:3500/' + imageUrl"
      height="auto"
      fill-height
      cover
    ></v-img>

    <v-card-title> {{ edition }} "{{ title }}"</v-card-title>

    <v-card-subtitle> broj {{ issue }}</v-card-subtitle>
    <p class="text-h6 text-right mr-3">{{ price }}rsd.</p>
    <v-card-actions>
      <v-btn text="Detaljnije" @click="productDetails(_id)" rounded> </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        text="Dodaj u korpu"
        color="green-darken-1"
        @click="addToCart(_id)"
        rounded
        :loading="isLoading"
      >
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { useCartStore } from "@/stores/cart";
export default {
  props: [
    "_id",
    "edition",
    "title",
    "issue",
    "description",
    "price",
    "imageUrl",
  ],
  emits: ["addedToCart"],
  data() {
    return {
      isLoading: false,
    };
  },
  // computed: {},
  setup() {
    const cartStore = useCartStore();
    return {
      cartStore,
    };
  },
  methods: {
    productDetails(id) {
      this.$router.push("/products/" + id);
    },
    async addToCart(id, quantity = 1) {
      this.isLoading = true;
      await this.cartStore.addToCart(id, quantity);
      this.isLoading = false;
      this.$emit("addedToCart", { productId: id });
    },
  },
};
</script>
<style scoped>
.product-image {
  cursor: pointer;
}
</style>
