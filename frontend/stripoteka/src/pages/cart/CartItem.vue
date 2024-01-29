<template>
  <v-row class="ma-auto cart-item-row">
    <v-col md="4" sm="4" cols="12" class="text-h6 my-auto">{{ title }} </v-col>
    <v-col md="2" sm="3" class="my-auto">
      <span class="text-h6">{{ price * quantity }}rsd.</span>
    </v-col>

    <v-col md="2" cols="12" class="my-auto"
      ><v-text-field
        v-model="qty"
        :disabled="!editMode"
        hide-details
        single-line
        type="number"
        label="quantity"
    /></v-col>
    <v-col md="2" cols="12" class="my-auto">
      <v-btn class="mr-1" icon @click="removeFromCart(_id)" text="Delete">
        <v-icon>mdi-delete</v-icon>
      </v-btn>

      <v-btn :isLoading="true" icon @click="editMode = !editMode">
        <v-icon v-if="!editMode">mdi-pencil</v-icon>
        <v-icon v-else>mdi-close</v-icon>
      </v-btn>
      <v-btn v-if="editMode" icon @click="saveEditCart(_id, qty)">
        <v-icon>mdi-check</v-icon>
      </v-btn>
      <!-- <v-btn v-else icon @click="editMode = !editMode">
        <v-icon>mdi-close</v-icon>
      </v-btn> -->
    </v-col>
  </v-row>
  <v-row :align="'center'"> </v-row>
</template>

<script>
import { useCartStore } from "@/stores/cart";
export default {
  name: "CartItem",
  emits: ["cartChanged"],
  props: {
    title: String,
    imageUrl: String,
    price: Number,
    quantity: Number,
    _id: String,
  },
  setup() {
    const cartStore = useCartStore();
    console.log(cartStore);
    return {
      cartStore,
    };
  },
  data() {
    return {
      editMode: false,
      qty: this.quantity,
    };
  },
  methods: {
    async removeFromCart(id) {
      await this.cartStore.removeFromCart(id);
    },
    async saveEditCart(id, quantity) {
      await this.cartStore.editItem(id, quantity);
      this.editMode = false;
      this.$emit("cartChanged");
    },
  },
};
</script>
<style scoped>
.cart-item-row {
  padding: 0;
  margin: 0;
  /* height: 1rem; */
}
.cart-item-image-col {
  padding: 0;
}
</style>
