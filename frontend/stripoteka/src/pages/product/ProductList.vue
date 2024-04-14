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
            placeholder="Pretrazite pomocu naslova ili broja izdanja"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-btn class="w-100 form-btn" color="primary" type="submit"
            >Pretraži</v-btn
          >
        </v-col>

        <v-col cols="12" md="4">
          <v-autocomplete
            label="Edicija"
            clearable="true"
            chips
            multiple
            v-model="editionFilters"
            @update:menu="applyFilters"
            :items="editions"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            label="Sortiranje"
            chips
            @update:menu="applySorting"
            :items="sortingOptions"
            item-value="value"
            v-model="selectedSorting"
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-btn class="w-100 form-btn" color="green" @click="resetFilters">
            Resetuj filtere
          </v-btn>
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
      <p v-if="!products.length">Nije pronađen nijedan strip!</p>
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
        { title: "Naslov - Rastući", value: "titleAsc" },
        { title: "Naslov - Opadajući", value: "titleDesc" },
        { title: "Cena - Rastuća", value: "priceAsc" },
        { title: "Cena - Opadajuća", value: "priceDesc" },
        { title: "Broj - Rastući", value: "issueAsc" },
        { title: "Broj - Opadajući", value: "issueDesc" },
      ],
      selectedSorting: "titleAsc",
      searchRules: [(v) => v.length > 0 || "Pojam za pretragu je obavezan!"],
      editionFilters: [],
      filteredProducts: null,
      isLoading: false,
    };
  },
  methods: {
    resetFilters() {
      // this.selectedSorting = "priceAsc";
      // this.searchText = "";
      // this.editionFilters = [];
      // await this.productsStore.fetchProducts();
      // this.applyFilters();
      this.$router.go();
    },
    async searchProducts() {
      const validation = await this.$refs.form.validate();
      // console.log(validation);
      if (!validation.valid) return;

      this.isLoading = true;

      await this.productsStore.findProduct(this.searchText);
      this.filteredProducts = this.products;

      this.isLoading = false;
      this.applyFilters();
      this.applySorting();
    },
    applyFilters() {
      if (this.editionFilters.length) {
        this.filteredProducts = this.products.filter((p) => {
          return this.editionFilters.includes(p.edition);
        });
      }
    },
    applySorting() {
      switch (this.selectedSorting) {
        case "titleAsc": {
          this.filteredProducts = this.filteredProducts.sort((a, b) => {
            return a.title.localeCompare(b.title);
          });
          break;
        }
        case "titleDesc": {
          this.filteredProducts = this.filteredProducts.sort((a, b) => {
            return b.title.localeCompare(a.title);
          });
          break;
        }
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
    this.isLoading = true;
    await this.productsStore.fetchProducts();
    this.editionFilters = this.editions;
    // this.filteredProducts = this.products;
    this.applyFilters();
    this.applySorting();
    this.isLoading = false;
  },
};
</script>
<style scoped>
.form-btn {
  top: 0.5rem;
}
</style>
