import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "./user";

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      items: [],
    };
  },
  actions: {
    async addToCart(productId, quantity) {
      const userStore = useUserStore();
      const headers = {
        Authorization: "Bearer " + userStore.token,
      };
      const reqBody = {
        productId,
        quantity,
      };
      try {
        const res = await axios.post(
          "http://localhost:3500/api/v1/user/cart",
          reqBody,
          {
            headers,
          }
        );
        console.log(res.data);
      } catch (error) {
        return error.message;
      }
    },
    async fetchCart() {
      const userStore = useUserStore();
      const headers = {
        Authorization: "Bearer " + userStore.token,
      };
      try {
        const res = await axios.get("http://localhost:3500/api/v1/user/cart", {
          headers,
        });
        console.log(res.data.items);
        this.items = res.data.items;
      } catch (error) {
        return error.message;
      }
    },
  },
  getters: {},
});
