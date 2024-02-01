import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "./user";
export const useProductsStore = defineStore("products", {
  state: () => {
    return {
      products: [],
    };
  },
  actions: {
    async fetchProducts() {
      try {
        const res = await axios.get("http://localhost:3500/api/v1/products/");
        this.products = res.data.response.products;
      } catch (error) {
        return error.message;
      }
    },
    async createProduct(formData) {
      const userStore = useUserStore();
      const headers = {
        Authorization: "Bearer " + userStore.token,
        "Content-Type": "multipart/form-data",
      };

      try {
        await axios.post("http://localhost:3500/api/v1/products/", formData, {
          headers,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProduct(id) {
      const userStore = useUserStore();
      const headers = {
        Authorization: "Bearer " + userStore.token,
      };
      try {
        await axios.delete("http://localhost:3500/api/v1/products/" + id, {
          headers,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async editProduct(id, formData) {
      const userStore = useUserStore();
      const headers = {
        Authorization: "Bearer " + userStore.token,
      };
      try {
        await axios.patch(
          "http://localhost:3500/api/v1/products/" + id,
          formData,
          {
            headers,
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {},
});
