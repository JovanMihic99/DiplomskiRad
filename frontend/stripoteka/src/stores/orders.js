import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "./user";
import { useCartStore } from "./cart";
import config from "../config";
export const useOrdersStore = defineStore("orders", {
  state: () => {
    return {
      orders: [],
    };
  },
  actions: {
    async createOrder(
      firstName,
      lastName,
      shippingAddress,
      billingAddress = shippingAddress
    ) {
      const userStore = useUserStore();
      const cartStore = useCartStore();
      const headers = {
        Authorization: "Bearer " + userStore.token,
      };

      const reqBody = {
        userId: userStore._id,
        firstName,
        lastName,
        shippingAddress,
        billingAddress,
        products: cartStore.items.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
      };
      try {
        const res = await axios.post(
          config.API_URL + "/api/v1/orders/",
          reqBody,
          {
            headers,
          }
        );

        console.log(res.data);
        console.log(this.orders);
      } catch (error) {
        return error.message;
      }
    },
    async fetchOrders() {
      const userStore = useUserStore();
      const headers = {
        Authorization: "Bearer " + userStore.token,
      };

      try {
        const res = await axios.get(config.API_URL + "/api/v1/orders/all", {
          headers,
        });
        this.orders = res.data.orders;

        // turn each order date string into a date object
        this.orders.forEach(
          (o) => (o.orderDate = new Date(o.orderDate).toLocaleString()) // prettier-ignore
        );
        console.log(res.data);
        console.log(this.orders);
      } catch (error) {
        return error.message;
      }
    },
    async fetchUserOrders() {
      const userStore = useUserStore();
      const headers = {
        Authorization: "Bearer " + userStore.token,
      };
      try {
        const res = await axios.get(config.API_URL + "/api/v1/orders/", {
          headers,
        });
        this.orders = res.data.orders;

        // turn each order date string into a date object
        this.orders.forEach(
          (o) => (o.orderDate = new Date(o.orderDate).toLocaleString()) // prettier-ignore
        );
        console.log(res.data);
        console.log(this.orders);
      } catch (error) {
        return error.message;
      }
    },
  },
  getters: {},
});
