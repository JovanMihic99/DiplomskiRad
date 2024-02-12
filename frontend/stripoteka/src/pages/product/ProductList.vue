<template>
  <div>
    <v-row>
      <v-col cols="8" md="4" class="mx-auto">
        <v-autocomplete
          ref="selectEdition"
          label="Edicija"
          chips
          multiple
          @update:menu="applyFilters"
          v-model="editionFilters"
          :items="editions"
        ></v-autocomplete>
        <v-select
          ref="selectSorting"
          label="Sortiranje"
          @update:menu="applySorting"
          :items="sortingOptions"
          single-line
          item-value="value"
          v-model="selectedSorting"
        >
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" class="mx-auto mt-8"> </v-col>
    </v-row>

    <v-row class="mx-3 my-2" justify="center">
      <v-col v-for="p in filteredProducts" :key="p._id" lg="4" md="6" sm="12">
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
      sortingOptions: [
        { title: "Cena - Rastuća", value: "priceAsc" },
        { title: "Cena - Opadajuća", value: "priceDesc" },
        { title: "Broj - Rastući", value: "issueAsc" },
        { title: "Broj - Opadajući", value: "issueDesc" },
      ],
      selectedSorting: "",
      editionFilters: [],
      filteredProducts: null,
    };
  },
  methods: {
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
    // console.log(this.$refs.selectEdition);
    // console.log(this.edition);
    // console.log(this.filteredProducts);

    await this.productsStore.fetchProducts();
    this.filteredProducts = this.products;
  },
};
</script>
