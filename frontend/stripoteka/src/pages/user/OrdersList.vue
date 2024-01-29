<template>
  <div>
    <h1>My orders</h1>
  </div>
  <v-list>
    <v-list-item v-for="order in ordersStore.orders" :key="order._id">
      {{ order.shippingAddress }}
    </v-list-item>
  </v-list>
</template>
<script>
import { useOrdersStore } from "@/stores/orders";
export default {
  async mounted() {
    await this.ordersStore.fetchOrders();
  },

  setup() {
    return {
      ordersStore: useOrdersStore(),
    };
  },
};
</script>
