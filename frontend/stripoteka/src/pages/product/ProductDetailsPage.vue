<template>
  <div class="pa-3">
    <base-dialog
      v-if="openDialog"
      @closedDialog="openDialog = false"
      teleport="body"
    >
      <v-img height="80vh" width="auto" :src="API_URL + '/' + product.imageUrl">
      </v-img>
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
        <h1 class="pb-10 text-h3 text-center">
          {{ product.edition }} #{{ product.issue }} "{{ product.title }}"
        </h1>

        <p class="justify-center">{{ product.description }}</p>

        <b class="text-h5 font-weight-bold">Cena: {{ product.price }}rsd.</b>
        <br />
        <v-row>
          <v-col md="3" cols="12" class="mt-5">
            <v-text-field
              type="number"
              v-model="quantity"
              label="Količina"
              required
            ></v-text-field>
          </v-col>
          <v-col md="6" cols="12" class="my-auto">
            <v-btn
              class="w-100"
              prepend-icon="mdi-cart"
              color="green-darken-3"
              size="large"
              @click="addToCart"
              :loading="isLoading"
              :disabled="!userStore.token"
            >
              Dodaj u korpu
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-if="carouselItems.length > 0">
      <v-col cols="12" md="8" class="mx-auto my-8">
        <h2 class="text-center">Pogledajte još sličnih stripova:</h2>
        <v-carousel cycle hide-delimiters="true" height="auto">
          <v-carousel-item v-for="page in carouselItems" :key="page">
            <v-row class="mx-auto">
              <v-col
                class="mx-auto"
                cols="3"
                v-for="product in page"
                :key="product._id"
              >
                <router-link :to="{ name: 'pdp', params: { id: product._id } }">
                  <v-img
                    class="product-image"
                    style="width: 30vw; height: auto"
                    :src="API_URL + '/' + product.imageUrl"
                  >
                  </v-img>
                </router-link>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { useProductsStore } from "@/stores/products";
import { useCartStore } from "@/stores/cart";
import { useUserStore } from "@/stores/user";

import config from "../../config";

export default {
  setup() {
    return {
      productsStore: useProductsStore(),
      cartStore: useCartStore(),
      userStore: useUserStore(),
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

      similarProducts: [],
      carouselItems: [],
      id: this.$route.params.id,
    };
  },

  methods: {
    async addToCart() {
      this.isLoading = true;
      await this.cartStore.addToCart(this.id, this.quantity);
      this.isLoading = false;
    },
    // async goToProduct(id) {
    //   // this.id = id;
    //   await this.fetchProductData(id);
    //   this.$forceUpdate();
    //   // this.$router.push(id);
    // },
    async fetchProductData(id) {
      this.id = id;
      await this.productsStore.fetchProducts();
      this.product = await this.productsStore.getProduct(id);

      this.similarProducts = this.productsStore.products
        .filter((p) => p.edition === this.product.edition && p._id !== id)
        .slice(0, 9);

      if (this.carouselItems.length >= 3) {
        return;
      }
      this.similarProducts = this.similarProducts.concat(
        this.productsStore.products
          .sort(() => Math.random() - 0.5)
          .filter((p) => p.edition !== this.product.edition)
          .slice(0, 9 - this.similarProducts.length)
      );
      while (this.similarProducts.length > 0) {
        this.carouselItems.push(this.similarProducts.splice(0, 3));
      }
      console.log(this.carouselItems);
    },
  },
  async mounted() {
    await this.fetchProductData(this.id);
  },
  async updated() {
    await this.fetchProductData(this.id);
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
