<template>
  <div>
    <h1 class="text-h3 text-center mb-5">Dodaj novi strip</h1>

    <v-form @submit.prevent="sendOrder" ref="form">
      <v-row>
        <v-col cols="12" md="4" class="ma-auto">
          <v-combobox
            label="Izdanje"
            :items="[
              'California',
              'Colorado',
              'Florida',
              'Georgia',
              'Texas',
              'Wyoming',
            ]"
          ></v-combobox>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="ma-auto">
          <v-text-field
            :rules="issueRules"
            prepend-inner-icon="mdi-numeric"
            type="Number"
            v-model="issue"
            label="Broj izdanja"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="ma-auto">
          <v-text-field
            :rules="titleRules"
            prepend-inner-icon="mdi-form-textbox"
            type="text"
            v-model="title"
            label="Naslov"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="ma-auto">
          <v-textarea
            auto-grow
            clearable
            :rules="descriptionRules"
            prepend-inner-icon="mdi-form-textbox"
            type="text"
            v-model="description"
            label="Opis"
            required
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="ma-auto">
          <v-file-input label="Slika stripa"></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="ma-auto">
          <v-text-field
            :rules="priceRules"
            prepend-inner-icon="mdi-cash"
            type="Number"
            v-model="price"
            label="Cena"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row cols="12" md="4" class="ma-auto">
        <v-btn
          class="ma-auto"
          text="Dodaj proizvod"
          type="submit"
          prepend-icon="mdi-plus"
          color="primary"
        ></v-btn>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import { useProductsStore } from "@/stores/products";
export default {
  setup() {
    const productsStore = useProductsStore;

    return { productsStore };
  },
  async mounted() {},
  data() {
    return {
      title: "",
      description: "",
      issue: "",
      price: "",
      imageUrl: "",
      edition: "",
      titleRules: [
        (v) => v.length >= 5 || "Naslov mora sadržati bar pet slova",
      ],
      descriptionRules: [
        (v) => v.length >= 5 || "Opis mora sadržati bar pet slova",
      ],
      priceRules: [(v) => v.length || "Cena je obavezna"],
      issueRules: [(v) => v.length || "Broj izdanja je obavezan"],
    };
  },
  methods: {
    toggleBilling() {
      if (this.sameAddress) {
        return true;
      }
    },
    async sendOrder() {
      const validation = await this.$refs.form.validate();
      if (!validation.valid) return;

      await this.productsStore.createProduct(
        this.firstName,
        this.lastName,
        this.shippingAddress,
        this.billingAddress
      );
    },
  },
};
</script>
