<template>
  <div>
    <base-dialog
      title="Edit product"
      @closedDialog="isEditing = false"
      v-if="isEditing"
      teleport="body"
    >
      <edit-product-component
        :productData="itemData"
        @productSaved="fetchProducts(), (isEditing = false)"
      ></edit-product-component>
    </base-dialog>
    <h1 class="text-center">Proizvodi</h1>
    <v-progress-linear
      v-if="isLoading"
      indeterminate
      color="cyan"
    ></v-progress-linear>
    <v-data-table
      :headers="headers"
      :items="items"
      item-key="_id"
      class="elevation-1"
    >
      <template v-slot:[`item.edit`]="{ item }">
        <v-btn
          @click="editItem(item)"
          size="small"
          icon
          color="green"
          :disabled="isLoading"
          ><v-icon>mdi-pencil</v-icon></v-btn
        >
      </template>
      <template v-slot:[`item.delete`]="{ item }">
        <v-btn
          @click="deleteItem(item)"
          size="small"
          icon
          color="red"
          :disabled="isLoading"
          ><v-icon>mdi-delete</v-icon></v-btn
        >
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { useProductsStore } from "@/stores/products";
import EditProductComponent from "./EditProductComponent.vue";
export default {
  components: {
    EditProductComponent,
  },
  data() {
    return {
      items: [],
      isLoading: false,
      isEditing: false,
      itemData: {},
      headers: [
        { title: "ID", value: "_id" },
        { title: "Edition", value: "edition" },
        { title: "Title", value: "title" },
        { title: "Issue", value: "issue" },
        { title: "Price", value: "price" },
        { title: "Description", value: "description" },
        { title: "Edit", value: "edit" },
        { title: "Delete", value: "delete" },
      ],
    };
  },
  created() {
    const productsStore = useProductsStore();
    this.productsStore = productsStore;
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        await this.productsStore.fetchProducts();
        this.items = this.productsStore.products;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async editItem(item) {
      // console.log(item);
      console.log(this.isEditing);
      this.isEditing = true;
      console.log(this.isEditing);
      delete item.imageUrl;
      this.itemData = { ...item };
      console.log("item data: ", this.itemData);

      // Logic to handle editing the item
    },
    async deleteItem(item) {
      console.log(item);
      this.isLoading = true;
      await this.productsStore.deleteProduct(item._id);
      this.isLoading = false;
      this.fetchProducts();
    },
  },
};
</script>
