<template>
  <div>
    <h1 class="text-h3 text-center mb-5">Porudžbina</h1>

    <v-form @submit.prevent="sendOrder" ref="form" class="mx-auto">
      <v-row class="ma-auto">
        <v-col cols="12" md="4" class="mx-auto">
          <v-text-field
            :rules="firstNameRules"
            prepend-inner-icon="mdi-form-textbox"
            type="text"
            v-model="firstName"
            label="Ime"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="ma-auto">
        <v-col cols="12" md="4" class="mx-auto">
          <v-text-field
            :rules="lastNameRules"
            prepend-inner-icon="mdi-form-textbox"
            type="text"
            v-model="lastName"
            label="Prezime"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="ma-auto">
        <v-col cols="12" md="4" class="mx-auto">
          <v-text-field
            :rules="phoneNumberRules"
            prepend-inner-icon="mdi-phone"
            type="text"
            v-model="phoneNumber"
            label="Kontakt telefon"
            hint="npr. +381 61555666"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <div>
        <p class="text-center mx-auto">Adresa isporuke</p>
        <v-row class="ma-auto">
          <v-col cols="12" md="4" class="mx-auto">
            <!-- <v-text-field
            :rules="shippingAddressRules"
            prepend-inner-icon="mdi-home-city"
            type="text"
            v-model="shippingAddress"
            label="Adresa isporuke"
            required
          ></v-text-field> -->
            <v-text-field
              :rules="streetRules"
              prepend-inner-icon="mdi-home-city"
              type="text"
              v-model="shippingAddress.street"
              label="Ulica"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="ma-auto">
          <v-col cols="12" md="4" class="mx-auto">
            <v-text-field
              :rules="houseNumberRules"
              prepend-inner-icon="mdi-home-city"
              type="number"
              v-model="shippingAddress.houseNumber"
              label="Broj kuce"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="ma-auto">
          <v-col cols="12" md="4" class="mx-auto">
            <v-text-field
              :rules="cityRules"
              prepend-inner-icon="mdi-home-city"
              type="text"
              v-model="shippingAddress.city"
              label="Grad"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="ma-auto">
          <v-col cols="12" md="4" class="mx-auto">
            <v-text-field
              :rules="postalCodeRules"
              prepend-inner-icon="mdi-home-city"
              type="text"
              v-model="shippingAddress.postalCode"
              label="Poštanski broj"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </div>

      <div v-if="!sameAddress">
        <p class="text-center mx-auto">Adresa naplate</p>

        <v-row class="ma-auto">
          <v-col cols="12" md="4" class="mx-auto">
            <v-text-field
              :rules="streetRules"
              prepend-inner-icon="mdi-home-city"
              type="text"
              v-model="billingAddress.street"
              label="Ulica"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="ma-auto">
          <v-col cols="12" md="4" class="mx-auto">
            <v-text-field
              :rules="houseNumberRules"
              prepend-inner-icon="mdi-home-city"
              type="number"
              v-model="billingAddress.houseNumber"
              label="Broj kuce"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="ma-auto">
          <v-col cols="12" md="4" class="mx-auto">
            <v-text-field
              :rules="cityRules"
              prepend-inner-icon="mdi-home-city"
              type="text"
              v-model="billingAddress.city"
              label="Grad"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="ma-auto">
          <v-col cols="12" md="4" class="mx-auto">
            <v-text-field
              :rules="postalCodeRules"
              prepend-inner-icon="mdi-home-city"
              type="text"
              v-model="billingAddress.postalCode"
              label="Poštanski broj"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </div>

      <v-row>
        <v-col cols="12" md="4" class="ma-auto">
          <v-checkbox
            label="Koristi istu adresu za isporuku i naplatu"
            checked
            v-model="sameAddress"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="ma-auto">
          <v-checkbox
            label="Sacuvaj podatke"
            v-model="saveCheckoutInfo"
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
/* eslint-disable */
import { useCartStore } from "@/stores/cart";
import { useOrdersStore } from "@/stores/orders";
import { useUserStore } from "@/stores/user";
export default {
  setup() {
    const cartStore = useCartStore();
    const ordersStore = useOrdersStore();

    const userStore = useUserStore();

    return { cartStore, ordersStore, userStore };
  },
  async mounted() {
    await this.cartStore.getCart();
    await this.userStore.fetchCheckoutInfo();
    try {
      // await this.userStore.initializeFromStorage();
      const checkoutInfo = this.userStore.checkoutInfo;
      console.log(checkoutInfo);
      this.firstName = checkoutInfo.firstName;
      this.lastName = checkoutInfo.lastName;
      this.phoneNumber = checkoutInfo.phoneNumber;
      this.shippingAddress = checkoutInfo.shippingAddress;
      this.billingAddress = checkoutInfo.billingAddress;

      Address;
    } catch (error) {
      console.log(error);
    }
  },
  data() {
    return {
      saveCheckoutInfo: false,
      firstName: "",
      lastName: "",
      shippingAddress: {
        city: "",
        street: "",
        houseNumber: "",
        postalCode: "",
      },
      billingAddress: {
        city: "",
        street: "",
        houseNumber: "",
        postalCode: "",
      },
      sameAddress: true,
      phoneNumber: "",
      firstNameRules: [(v) => v.length > 0 || "Ime je obavezno!"],
      lastNameRules: [(v) => v.length > 0 || "Prezime je obavezno!"],
      shippingAddressRules: [
        (v) => v.length > 0 || "Adresa isporuke je obavezna",
      ],
      billingAddressRules: [
        (v) => v.length > 0 || "Adresa naplate je obavezna",
        // Doraditi ovo!!!!!!
      ],
      phoneNumberRules: [
        (v) => {
          const phoneNumberRegex =
            // eslint-disable-next-line
            /^\+\d{3}[\s-]?\d{2}[\s-]?\d{3}[\s-]?\d{3,4}$/;
          // /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

          if (v.length > 0 && phoneNumberRegex.test(v)) {
            return true;
          } else {
            return "Unesite validan broj telefona";
          }
        },
      ],
    };
  },
  methods: {
    async sendOrder() {
      const validation = await this.$refs.form.validate();
      console.log(validation);
      if (!validation.valid) return;

      try {
        if (this.sameAddress) {
          this.billingAddress = { ...this.shippingAddress };
        }
        await this.ordersStore.createOrder(
          this.firstName,
          this.lastName,
          this.shippingAddress,
          this.billingAddress
        );

        if (this.saveCheckoutInfo) {
          const checkoutData = {
            firstName: this.firstName,
            lastName: this.lastName,
            phoneNumber: this.phoneNumber,
            shippingAddress: {
              city: this.shippingAddress.city,
              street: this.shippingAddress.street,
              houseNumber: this.shippingAddress.houseNumber,
              postalCode: this.shippingAddress.postalCode,
            },
            billingAddress: {
              city: this.billingAddress.city,
              street: this.billingAddress.street,
              houseNumber: this.billingAddress.houseNumber,
              postalCode: this.billingAddress.postalCode,
            },
          };
          await this.userStore.saveCheckoutInfo(checkoutData);
        }
      } catch (error) {
        console.log(error);
      }

      this.$router.push("/user/orders");
    },
  },
};
</script>
