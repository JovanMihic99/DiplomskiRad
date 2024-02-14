<template>
  <v-row class="mx-auto cart-item-row">
    <v-col md="2" cols="12" class="ma-auto" align="center">
      <router-link :to="{ name: 'pdp', params: { id: _id } }"
        ><img :src="imageUrl" alt="Product image" height="150vh" />
      </router-link>
    </v-col>
    <v-col>
      <v-row>
        <v-col cols="12" class="text-h5 my-auto">{{ title }} </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <p class="text-h6 my-5" align="left">{{ price }}rsd.</p>
        </v-col>
        <v-col md="3" cols="6"
          ><v-text-field
            class="mx-0 my-auto pt-3"
            v-model="qty"
            :disabled="!editMode"
            hide-details
            min="0"
            max="10"
            single-line
            type="number"
            variant="solo"
            prepend-icon="mdi-close-thick"
            append-icon="mdi-equal"
        /></v-col>
        <v-col md="2" cols="4">
          <p class="text-h6 text-center my-5">{{ price * quantity }}rsd.</p>
        </v-col>
        <v-col md="3" cols="12">
          <v-btn
            class="mr-3"
            icon
            size="large"
            @click="removeFromCart(_id)"
            text="Delete"
          >
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>

          <v-btn
            :isLoading="true"
            class="mr-3"
            icon
            size="large"
            @click="editMode = !editMode"
          >
            <v-icon v-if="!editMode" color="green">mdi-pencil</v-icon>
            <v-icon v-else>mdi-close</v-icon>
          </v-btn>
          <v-btn
            v-if="editMode"
            class="mr-1"
            icon
            size="large"
            @click="saveEditCart(_id, qty)"
          >
            <v-icon color="green">mdi-check</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
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
