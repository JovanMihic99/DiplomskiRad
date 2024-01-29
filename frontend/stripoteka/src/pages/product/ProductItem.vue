<template>
  <v-card class="mx-auto" max-width="344" @click="productDetails(_id)">
    <v-img
      :src="
        'https://picsum.photos/id/' +
        Math.floor(Math.random() * 250) +
        '/200/300'
      "
      height="10rem"
      fill-height
      cover
    ></v-img>

    <v-card-title> {{ edition }} {{ title }} #{{ issue }} </v-card-title>

    <v-card-subtitle> {{ price }}rsd.</v-card-subtitle>

    <v-card-actions>
      <v-btn
        text="Dodaj u korpu"
        color="green-darken-1"
        @click="addToCart(_id)"
        rounded
      >
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn text="Detaljnije" @click="productDetails(_id)" rounded> </v-btn>
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
    addToCart(id, quantity = 1) {
      this.cartStore.addToCart(id, quantity);
      this.$emit("addedToCart", { productId: id });
    },
  },
};
</script>
