import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "./user";
import config from "../config";
export const useProductsStore = defineStore("products", {
  state: () => {
    return {
      products: [],
      editions: [],
    };
  },
  actions: {
    async fetchProducts() {
      try {
        const res = await axios.get(config.API_URL + "/api/v1/products/");
        this.products = res.data.response.products;
        this.editions = res.data.response.editions;
      } catch (error) {
        return error.message;
      }
    },
    async getProduct(id) {
      try {
        const res = await axios.get(config.API_URL + "/api/v1/products/" + id);
        return res.data.product;
      } catch (error) {
        console.log(error.message);
      }
    },
    async createProduct(formData) {
      const userStore = useUserStore();
      const headers = {
        Authorization: "Bearer " + userStore.token,
        "Content-Type": "multipart/form-data",
      };
      try {
        await axios.post(config.API_URL + "/api/v1/products/", formData, {
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
        "Content-Type": "multipart/form-data",
      };
      try {
        await axios.post(config.API_URL + "/api/v1/products/" + id, formData, {
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
        await axios.delete(config.API_URL + "/api/v1/products/" + id, {
          headers,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async findProduct(key) {
      try {
        const res = await axios.get(
          config.API_URL + "/api/v1/products/search/" + key
        );
        this.products = res.data.products;
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {},
});
