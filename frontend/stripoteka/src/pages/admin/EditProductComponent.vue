<template>
  <div>
    <h1 class="text-h3 text-center mb-5">Izmeni strip</h1>
    <div class="text-center" v-if="isLoading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <v-form v-else @submit.prevent="saveProduct" ref="form">
      <v-row>
        <v-col cols="12" class="ma-auto">
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
            v-model="edition"
          ></v-combobox>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="ma-auto">
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
        <v-col cols="12" class="ma-auto">
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
        <v-col cols="12" class="ma-auto">
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
        <v-col cols="12" class="ma-auto">
          <v-checkbox
            label="Promeni sliku"
            v-model="shouldUploadImage"
          ></v-checkbox>
          <v-file-input
            :disabled="!shouldUploadImage"
            label="Slika stripa"
            ref="fileInput"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="ma-auto">
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

      <v-row cols="12" class="ma-auto">
        <v-btn
          class="ma-auto"
          text="Sačuvaj izmene"
          type="submit"
          prepend-icon="mdi-content-save"
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
    const productsStore = useProductsStore();

    return { productsStore };
  },
  emits: ["productSaved"],
  props: ["productData"],
  data() {
    return {
      isLoading: false,
      shouldUploadImage: false,
      title: this.productData.title,
      description: this.productData.description,
      issue: this.productData.issue,
      price: this.productData.price,
      edition: this.productData.edition,
      titleRules: [(v) => !!v || "Naslov je obavezan"],
      descriptionRules: [(v) => !!v || "Opis je obavezan"],
      priceRules: [(v) => !!v || "Cena je obavezna"],
      issueRules: [(v) => !!v || "Broj izdanja je obavezan"],
    };
  },
  methods: {
    toggleBilling() {
      if (this.sameAddress) {
        return true;
      }
    },
    async saveProduct() {
      const validation = await this.$refs.form.validate();
      if (!validation.valid) return;
      const formData = new FormData();
      formData.append("edition", this.edition);
      formData.append("issue", this.issue);
      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("price", this.price);

      if (this.shouldUploadImage) {
        formData.append("productImage", this.$refs.fileInput.files[0]);
        // console.log(formDataA.productImage);
      }
      console.log(
        this.edition,
        this.issue,
        this.title,
        this.description,
        this.price
      );
      console.log("FormData:", formData);
      this.isLoading = true;
      await this.productsStore.editProduct(this.productData._id, formData);
      this.isLoading = false;

      this.$emit("productSaved");
    },
  },
};
</script>
