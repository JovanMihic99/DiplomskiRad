import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: null,
      _id: null,
      name: null,
      email: null,
      cart: [],
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
        this.cart = res.data.cart;
        this.role = res.data.role;
      } catch (error) {
        return error.message;
      }
    },
  },
  getters: {},
});
