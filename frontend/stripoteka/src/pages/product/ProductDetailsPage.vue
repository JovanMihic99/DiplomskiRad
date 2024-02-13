<template>
  <div class="pa-3">
    <base-dialog
      v-if="openDialog"
      @closedDialog="openDialog = false"
      teleport="body"
    >
      <v-img width="80vw" :src="API_URL + '/' + product.imageUrl"> </v-img>
    </base-dialog>
    <v-row class="px-10 my-15">
      <v-col md="5" cols="12">
        <v-img
          @click="openDialog = true"
          max-height="50vh"
          :src="API_URL + '/' + product.imageUrl"
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
    <v-row v-if="carouselItems.length > 0">
      <v-col cols="12" md="8" class="mx-auto my-8">
        <h2 class="text-center">
          Pogledajte i druge "{{ product.edition }}" stripove:
        </h2>
        <v-carousel cycle hide-delimiter-background max-height="50vh">
          <v-carousel-item v-for="item in carouselItems" :key="item._id">
            <v-img
              class="product-image"
              @click="goToProduct(item._id)"
              max-height="50vh"
              :src="API_URL + '/' + item.imageUrl"
            >
              {{ "/products/" + item._id }}
            </v-img>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { useProductsStore } from "@/stores/products";
import { useCartStore } from "@/stores/cart";
import config from "../../config";
export default {
  setup() {
    return {
      productsStore: useProductsStore(),
      cartStore: useCartStore(),
    };
  },

  data() {
    return {
      API_URL: config.API_URL,
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
      carouselItems: [],
    };
  },

  methods: {
    async addToCart() {
      const id = this.$route.params.id;
      this.isLoading = true;
      await this.cartStore.addToCart(id, this.quantity);
      this.isLoading = false;
    },
    goToProduct(id) {
      // console.log("products/" + id);
      console.log(id);
      // const path = "/products/" + id;
      // console.log(path);
      this.$router.push({ name: "pdp", params: { id: id } });
    },
  },
  async mounted() {
    const id = this.$route.params.id;
    // console.log(id);
    await this.productsStore.fetchProducts();
    this.product = this.productsStore.products.find((p) => {
      return p._id.toString() === id;
    });
    this.carouselItems = this.productsStore.products
      .filter((p) => p.edition === this.product.edition && p !== this.product)
      .slice(0, 5);
    console.log(this.carouselItems);
    // console.log(this.product);
  },
};
</script>
<style scoped>
.product-image {
  cursor: pointer;
}
v-carousel {
  height: 10vh;
}
</style>
