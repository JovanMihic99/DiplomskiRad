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
        const res = await axios.get(
          "http://192.168.0.19:3500/api/v1/products/"
        );
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
        await axios.post(
          "http://192.168.0.19:3500/api/v1/products/",
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
