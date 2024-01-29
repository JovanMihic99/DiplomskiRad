import { defineStore } from "pinia";
import axios from "axios";
import { useCartStore } from "./cart";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: null,
      _id: null,
      name: null,
      email: null,
      role: null,
    };
  },
  actions: {
    async login(email, password) {
      try {
        const res = await axios.post(
          "http://localhost:3500/api/v1/user/login",
          {
            email,
            password,
          }
        );

        this.token = res.data.token;
        this._id = res.data._id;
        this.name = res.data.name;
        this.email = res.data.email;
        // this.cart = res.data.cart;
        this.role = res.data.role;

        await localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            token: this.token,
            _id: this._id,
            name: this.name,
            role: this.role,
          })
        ); // Persist login state
      } catch (error) {
        // Handle the error, e.g., log it or show message message
        console.log(error);
        // throw error.response.data.message; // rethrow the error to let the calling code handle it
      }
    },
    async logout() {
      const cartStore = useCartStore();
      this.token = null;
      this._id = null;
      this.name = null;
      this.email = null;
      cartStore.items = [];

      localStorage.removeItem("loggedInUser"); // Remove login state
    },
    async signup(email, password, name) {
      try {
        await axios.post("http://localhost:3500/api/v1/user/signup", {
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
      }
    },
  },
  getters: {},
});
