<template>
  <div>
    <h1 class="text-h3 text-center mb-5">Checkout</h1>

    <v-form @submit.prevent="sendOrder" ref="form">
      <v-row>
        <v-col cols="12" md="4" class="ma-auto">
          <v-text-field
            :rules="firstNameRules"
            prepend-inner-icon="mdi-form-textbox"
            type="text"
            v-model="firstName"
            label="First Name"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="ma-auto">
          <v-text-field
            :rules="lastNameRules"
            prepend-inner-icon="mdi-form-textbox"
            type="text"
            v-model="lastName"
            label="Last Name"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="ma-auto">
          <v-text-field
            :rules="shippingAddressRules"
            prepend-inner-icon="mdi-home-city"
            type="text"
            v-model="shippingAddress"
            label="Shipping Address"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="ma-auto">
          <v-text-field
            v-if="!sameAddress"
            ref="billingAddresss"
            :rules="billingAddressRules"
            :disabled="sameAddress"
            prepend-inner-icon="mdi-cash-multiple"
            type="text"
            v-model="billingAddress"
            label="Billing Address"
            required
          ></v-text-field>
          <v-checkbox
            label="Use shipping addres as billing address"
            checked
            v-model="sameAddress"
          ></v-checkbox>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="8" class="ma-auto">
          <v-list>
            <v-list-item v-for="item in cartStore.items" :key="item._id">
              {{ item.edition }} {{ item.title }} (#{{ item.issue }} )
              {{ item.price }}rsd.
            </v-list-item>
          </v-list>
          <p class="text-h5">
            Ukupna cena: <b>{{ cartStore.totalPrice }}rsd. </b>
          </p>
        </v-col>
      </v-row>
      <v-row cols="12" md="4" class="ma-auto">
        <v-btn
          class="ma-auto"
          text="Poruči"
          type="submit"
          prepend-icon="mdi-truck"
          color="primary"
        ></v-btn>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import { useCartStore } from "@/stores/cart";
import { useOrdersStore } from "@/stores/orders";
export default {
  setup() {
    const cartStore = useCartStore();
    const ordersStore = useOrdersStore();

    return { cartStore, ordersStore };
  },
  async mounted() {
    await this.cartStore.getCart();
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      shippingAddress: "",
      billingAddress: "",
      sameAddress: true,
      firstNameRules: [(v) => v.length > 0 || "First name must not be empty!"],
      lastNameRules: [(v) => v.length > 0 || "Last name must not be empty!"],
      shippingAddressRules: [
        (v) => v.length > 0 || "Address must not be empty",
      ],
      billingAddressRules: [
        (v) => v.length > 0 || "Billing ddress must not be empty",
        // Doraditi ovo!!!!!!
      ],
    };
  },
  methods: {
    async sendOrder() {
      const validation = await this.$refs.form.validate();
      console.log(validation);
      if (!validation.valid) return;

      try {
        if (!this.sameAddress) {
          await this.ordersStore.createOrder(
            this.firstName,
            this.lastName,
            this.shippingAddress, //send both addresses
            this.billingAddress
          );
        } else {
          await this.ordersStore.createOrder(
            this.firstName,
            this.lastName,
            this.shippingAddress, //send shipping address twice
            this.shippingAddress
          );
        }
      } catch (error) {
        console.log(error);
      }

      this.$router.push("/user/orders");
    },
  },
};
</script>
