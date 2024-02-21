<template>
  <div>
    <h1>Moje porudžbine</h1>

    <v-progress-linear
      v-if="isLoading"
      indeterminate
      color="cyan"
    ></v-progress-linear>
    <v-data-table
      :headers="headers"
      :items="orders"
      item-key="_id"
      class="elevation-1 px-2"
    >
      <template v-slot:[`item.status`]="{ item }">
        <p v-if="item.isShipped" class="text-green">Poslato</p>
        <p v-else class="text-red">Nije poslato</p>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { useOrdersStore } from "@/stores/orders";
export default {
  async created() {
    this.isLoading = true;
    await this.ordersStore.fetchUserOrders();
    this.orders = this.ordersStore.orders;
    this.isLoading = false;
  },
  setup() {
    return {
      ordersStore: useOrdersStore(),
    };
  },
  data() {
    return {
      isLoading: false,
      orders: [],
      headers: [
        { title: "Ime", value: "firstName" },
        { title: "Grad", value: "shippingAddress.city" },
        { title: "Ulica", value: "shippingAddress.street" },

        { title: "Datum narudžbine", value: "orderDate" },

        { title: "Status", value: "status" },
      ],
    };
  },
};
</script>
