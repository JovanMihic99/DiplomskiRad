<template>
  <div>
    <v-form @submit.prevent="searchProducts" ref="form">
      <v-row class="px-5" cols="12">
        <v-col cols="12" md="8">
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            type="text"
            v-model="searchText"
            :rules="searchRules"
            label="Pretraga"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-btn class="w-100" color="primary" type="submit">Pretraži</v-btn>
        </v-col>

        <v-col cols="12" md="5">
          <v-autocomplete
            label="Edicija"
            chips
            multiple
            v-model="editionFilters"
            :items="editions"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="5">
          <v-select
            label="Sortiranje"
            chips
            @update:menu="applySorting"
            :items="sortingOptions"
            single-line
            item-value="value"
            v-model="selectedSorting"
          >
            <template slot:label> Sortiranje </template>
          </v-select>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn color="primary" @click="applyFilters"> Primeni filtere </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-row class="mx-3 my-2" justify="center">
      <v-progress-circular
        v-if="isLoading"
        indeterminate
        :size="100"
      ></v-progress-circular>
      <v-col
        v-else
        v-for="p in filteredProducts"
        :key="p._id"
        lg="4"
        md="6"
        sm="12"
      >
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
      <p v-if="products.length == 0">Nije pronađen nijedan strip!</p>
    </v-row>
  </div>
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
    editions() {
      return this.productsStore.editions;
    },
  },
  setup() {
    const productsStore = useProductsStore();
    return {
      productsStore,
    };
  },
  data() {
    return {
      searchText: "",
      sortingOptions: [
        { title: "Cena - Rastuća", value: "priceAsc" },
        { title: "Cena - Opadajuća", value: "priceDesc" },
        { title: "Broj - Rastući", value: "issueAsc" },
        { title: "Broj - Opadajući", value: "issueDesc" },
      ],
      selectedSorting: "priceAsc",
      searchRules: [(v) => v.length > 0 || "Pojam za pretragu je obavezan!"],
      editionFilters: [],
      filteredProducts: null,
      isLoading: false,
    };
  },
  methods: {
    resetFilters() {
      this.editionFilters;
    },
    async searchProducts() {
      const validation = await this.$refs.form.validate();
      // console.log(validation);
      if (!validation.valid) return;

      this.isLoading = true;

      await this.productsStore.findProduct(this.searchText);
      this.filteredProducts = this.products;

      this.isLoading = false;
    },
    applyFilters() {
      this.filteredProducts = this.products.filter((p) => {
        return this.editionFilters.includes(p.edition);
      });
    },
    applySorting() {
      switch (this.selectedSorting) {
        case "priceAsc": {
          this.filteredProducts = this.filteredProducts.sort((a, b) => {
            return parseFloat(a.price) - parseFloat(b.price);
          });
          break;
        }
        case "priceDesc": {
          this.filteredProducts = this.filteredProducts.sort((a, b) => {
            return parseFloat(b.price) - parseFloat(a.price);
          });
          break;
        }
        case "issueAsc": {
          this.filteredProducts = this.filteredProducts.sort((a, b) => {
            return a.issue - b.issue;
          });
          break;
        }
        case "issueDesc": {
          this.filteredProducts = this.filteredProducts.sort((a, b) => {
            return b.issue - a.issue;
          });
          break;
        }
      }
    },
  },
  async mounted() {
    await this.productsStore.fetchProducts();
    this.isLoading = true;
    this.filteredProducts = this.products;
    this.isLoading = false;
  },
};
</script>
