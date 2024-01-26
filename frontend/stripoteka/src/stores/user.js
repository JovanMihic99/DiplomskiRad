import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: null,
      _id: null,
      name: null,
      email: null,
      // cart: [],
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
      } catch (error) {
        // Handle the error, e.g., log it or show a user-friendly message
        console.log(error);
        throw error.response.data.message; // rethrow the error to let the calling code handle it
      }
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
  },
  getters: {},
});
