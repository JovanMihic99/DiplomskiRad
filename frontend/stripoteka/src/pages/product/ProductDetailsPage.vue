<template>
  <div>
    <h1>{{ product.edition }} #{{ product.issue }} "{{ product.title }}"</h1>
    <v-img :src="product.imageUrl"></v-img>
    <p class="justify-center">{{ product.description }}</p>

    <b class="text-h5">Cena: {{ product.price }}</b>
    <p>Pogledaj jos druge brojeve iz ove edicije:</p>
    <v-carousel></v-carousel>
  </div>
</template>
<script>
import { useProductsStore } from "@/stores/products";
export default {
  setup() {
    return {
      productsStore: useProductsStore(),
    };
  },

  data() {
    return {
      product: {
        edition: "",
        title: "",
        issue: "",
        description: "",
        price: "",
        imageUrl: "",
      },
    };
  },
  mounted() {
    const id = this.$route.params.id;
    // console.log(id);
    this.product = this.productsStore.products.find((p) => {
      return p._id.toString() === id;
    });
    // console.log(this.product);
  },
};
</script>
