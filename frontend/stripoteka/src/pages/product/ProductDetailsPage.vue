<template>
  <div class="pa-3">
    <base-dialog
      v-if="openDialog"
      @closedDialog="openDialog = false"
      teleport="body"
    >
      <v-img width="80vw" :src="'http://localhost:3500/' + product.imageUrl">
      </v-img>
    </base-dialog>
    <v-row class="px-10 my-15">
      <v-col md="5" cols="12">
        <v-img
          @click="openDialog = true"
          max-height="50vh"
          :src="'http://localhost:3500/' + product.imageUrl"
          class="product-image"
        >
        </v-img>
      </v-col>
      <v-col md="7" cols="12">
        <h1 class="pb-10">
          {{ product.edition }} #{{ product.issue }} "{{ product.title }}"
        </h1>

        <p class="justify-center">{{ product.description }}</p>

        <b class="text-h5 font-weight-bold">Cena: {{ product.price }}rsd.</b>
        <br />
        <v-row>
          <v-col md="6" cols="12" class="my-auto">
            <v-btn
              class="w-100"
              prepend-icon="mdi-cart"
              color="green-darken-3"
              size="large"
              @click="addToCart"
              :loading="isLoading"
            >
              Dodaj u korpu
            </v-btn>
          </v-col>
          <v-col md="3" cols="12" class="mt-5">
            <v-text-field
              type="number"
              v-model="quantity"
              label="Količina"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <p>Pogledaj jos druge brojeve iz ove edicije:</p>
    <v-carousel></v-carousel>
  </div>
</template>
<script>
import { useProductsStore } from "@/stores/products";
import { useCartStore } from "@/stores/cart";
export default {
  setup() {
    return {
      productsStore: useProductsStore(),
      cartStore: useCartStore(),
    };
  },

  data() {
    return {
      isLoading: false,
      openDialog: false,
      quantity: 1,
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
  methods: {
    async addToCart() {
      const id = this.$route.params.id;
      this.isLoading = true;
      await this.cartStore.addToCart(id, this.quantity);
      this.isLoading = false;
    },
  },
  async mounted() {
    const id = this.$route.params.id;
    // console.log(id);
    await this.productsStore.fetchProducts();
    this.product = this.productsStore.products.find((p) => {
      return p._id.toString() === id;
    });
    // console.log(this.product);
  },
};
</script>
<style scoped>
.product-image {
  cursor: pointer;
}
</style>
