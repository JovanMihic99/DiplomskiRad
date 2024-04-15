<template>
  <div>
    <base-dialog
      title="Označi porudžbinu kao poslatu?"
      @closedDialog="isEditing = false"
      v-if="isEditing"
      teleport="body"
    >
      <v-btn class="mx-auto w-100" color="green-darken-3" @click="closeOrder()"
        >Potvrdi</v-btn
      >
    </base-dialog>
    <h1 class="text-center text-h3">Porudžbine</h1>
    <v-progress-linear
      v-if="isLoading"
      indeterminate
      color="cyan"
    ></v-progress-linear>
    <v-data-table
      :headers="headers"
      :items="items"
      item-key="_id"
      class="elevation-1 px-2"
    >
      <template v-slot:[`item.firstName`]="{ item }">
        <p>{{ item.firstName }} {{ item.lastName }}</p>
      </template>
      <template v-slot:[`item.shippingAddress.city`]="{ item }">
        <p>
          {{ item.shippingAddress.street }}
          {{ item.shippingAddress.houseNumber }},
          {{ item.shippingAddress.city }},
          {{ item.shippingAddress.postalCode }}
        </p>
      </template>
      <template v-slot:[`item.isShipped`]="{ item }">
        <p v-if="item.isShipped" class="text-green">Poslato</p>
        <p v-else class="text-red">Nije poslato</p>
      </template>
      <template v-slot:[`item.edit`]="{ item }">
        <v-btn
          @click="editItem(item)"
          size="small"
          icon
          color="green"
          :disabled="isLoading || item.isShipped"
          ><v-icon>mdi-check</v-icon></v-btn
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
// import { useProductsStore } from "@/stores/products";
import { useOrdersStore } from "@/stores/orders";
//   import EditProductComponent from "./EditProductComponent.vue";
export default {
  components: {
    //   EditProductComponent,
  },
  data() {
    return {
      items: [],
      isLoading: false,
      isEditing: false,
      itemData: {},
      orderId: null,
      headers: [
        { title: "ID", value: "_id" },
        { title: "Ime i Prezime", value: "firstName" },
        { title: "Adresa", value: "shippingAddress.city" },
        { title: "Datum poručivanja", value: "orderDate" },
        { title: "Poslato", value: "isShipped" },
        // { title: "Issue", value: "issue" },
        // { title: "Price", value: "price" },
        // { title: "Description", value: "description" },
        { title: "Edit", value: "edit" },
        { title: "Delete", value: "delete" },
      ],
    };
  },
  setup() {
    const ordersStore = useOrdersStore();

    return { ordersStore };
  },
  created() {
    // const productsStore = useProductsStore();
    // const ordersStore = useOrdersStore();
    // this.ordersStore = ordersStore;
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        await this.ordersStore.fetchOrders();
        this.items = this.ordersStore.orders;
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },
    async editItem(item) {
      console.log(item);

      this.isEditing = true;
      this.orderId = item._id;
      // delete item.imageUrl;
      this.itemData = { ...item };
      console.log("item data: ", this.itemData);
    },
    async closeOrder() {
      console.log(this.orderId);
      await this.ordersStore.closeOrder(this.orderId);
      await this.fetchOrders();
      this.isEditing = false;
    },
    async deleteItem(item) {
      console.log(item);
      this.isLoading = true;
      await this.ordersStore.deleteOrder(item._id);
      this.isLoading = false;
      this.fetchOrders();
    },
  },
};
</script>
<style scoped>
.v-btn:hover {
  transition: all 0.2s;
  transform: scale(1.02);
}
</style>
