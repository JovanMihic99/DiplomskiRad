import { defineStore } from "pinia";
import axios from "axios";
import { useCartStore } from "./cart";
import config from "../config";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: null,
      _id: null,
      name: null,
      email: null,
      role: null,
      checkoutInfo: null,
    };
  },
  actions: {
    async login(email, password) {
      try {
        const res = await axios.post(config.API_URL + "/api/v1/user/login", {
          email,
          password,
        });
        this.token = res.data.token;
        this._id = res.data._id;
        this.name = res.data.name;
        this.email = res.data.email;
        this.role = res.data.role;
        this.checkoutInfo = res.data.checkoutInfo;
        // Persist login state
        await localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            token: this.token,
            _id: this._id,
            name: this.name,
            role: this.role,
            checkoutInfo: this.checkoutInfo,
          })
        );
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      const cartStore = useCartStore();
      this.token = null;
      this._id = null;
      this.name = null;
      this.email = null;
      cartStore.items = [];
      this.checkoutInfo = null;
      localStorage.removeItem("loggedInUser"); // Remove login state
    },
    async signup(email, password, name) {
      try {
        await axios.post(config.API_URL + "/api/v1/user/signup", {
          email,
          password,
          name,
        });
      } catch (error) {
        console.log(error);
        throw error.response.data.message;
      }
    },
    async initializeFromStorage() {
      let loggedInUser = localStorage.getItem("loggedInUser");
      loggedInUser = JSON.parse(loggedInUser, null, 4);
      if (loggedInUser !== null) {
        this.token = loggedInUser.token;
        this._id = loggedInUser._id;
        this.name = loggedInUser.name;
        this.email = loggedInUser.email;
        this.role = loggedInUser.role;

        this.checkoutInfo = loggedInUser.checkoutInfo;
      }
    },
    async fetchCheckoutInfo() {
      const userStore = useUserStore();
      const headers = {
        Authorization: "Bearer " + userStore.token,
      };
      try {
        const res = await axios.get(
          config.API_URL + "/api/v1/user/checkout-info",
          {
            headers,
          }
        );
        console.log(res.data.items);
        this.checkoutInfo = res.data.items;
        console.log(this.checkoutInfo);
      } catch (error) {
        console.log(error);
      }
    },
    async saveCheckoutInfo(data) {
      const userStore = useUserStore();
      const headers = {
        Authorization: "Bearer " + userStore.token,
      };
      try {
        await axios.post(config.API_URL + "/api/v1/user/checkout-info", data, {
          headers,
        });
      } catch (error) {
        console.log(error);
        throw error.response.data.message;
      }
    },
  },
  getters: {},
});
