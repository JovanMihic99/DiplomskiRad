<template>
  <v-select
    class=""
    label="Edicija"
    :items="['Dilan Dog', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
  ></v-select>

  <v-row>
    <v-col cols="12" md="4" class="mx-auto mt-8"> </v-col>
  </v-row>

  <v-row class="mx-3 my-2" justify="center">
    <v-col v-for="p in products" :key="p._id" lg="4" md="6" sm="12">
      <product-item
        :_id="p._id"
        :edition="p.edition"
        :title="p.title"
        :issue="p.issue"
        :description="p.description"
        :price="p.price"
        :imageUrl="p.imageUrl"
      >
      </product-item>
    </v-col>
  </v-row>
</template>
<script>
import ProductItem from "./ProductItem.vue";
import { useProductsStore } from "@/stores/products";
export default {
  components: {
    ProductItem,
  },
  computed: {
    products() {
      return this.productsStore.products;
    },
  },
  setup() {
    const productsStore = useProductsStore();
    return {
      productsStore,
    };
  },
  async mounted() {
    await this.productsStore.fetchProducts();
  },
};
</script>
