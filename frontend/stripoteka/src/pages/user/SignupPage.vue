<template>
  <div>
    <h1 class="text-h3 text-center">Register</h1>
    <base-dialog v-if="error" title="Error" teleport="#app">
      Signup failed, user already exists. Maybe change username or email?
    </base-dialog>
    <v-form
      ref="form"
      class="pa-3 mt-5"
      v-if="!isLoading"
      @submit.prevent="register()"
    >
      <v-row>
        <v-col cols="12" md="4" class="ma-auto">
          <v-text-field
            :rules="nameRules"
            prepend-inner-icon="mdi-tag-text"
            type="text"
            v-model="name"
            label="Name"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="ma-auto">
          <v-text-field
            :rules="emailRules"
            prepend-inner-icon="mdi-email"
            v-model="email"
            label="Email"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="ma-auto">
          <v-text-field
            :rules="passwordRules"
            prepend-inner-icon="mdi-key"
            type="password"
            v-model="password"
            label="Password"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="ma-auto">
          <v-text-field
            :rules="confirmPassRules"
            prepend-inner-icon="mdi-key-outline"
            type="password"
            v-model="confirmPassword"
            label="Confrim Password"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4" class="ma-auto">
          <v-btn
            prepend-icon="mdi-check"
            type="submit"
            class="bg-blue w-100"
            text="Submit"
          ></v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="ma-auto">
          <p>
            Already have an account?
            <router-link to="/login">Log in</router-link>
          </p>
        </v-col>
      </v-row>
    </v-form>
    <!-- LOADING SPINNER -->
    <div v-else class="d-flex justify-center">
      <v-progress-circular
        class="mt-3"
        indeterminate
        model-value="20"
        :size="80"
      ></v-progress-circular>
    </div>
  </div>
</template>
<script>
import { useUserStore } from "@/stores/user";

export default {
  setup() {
    // const userStore = useUserStore();

    return {
      userStore: useUserStore(),
    };
  },

  data() {
    return {
      errorMessage: "",
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      nameRules: [
        (v) => v.length >= 5 || "Name must be at least 5 charactes long!",
      ],
      emailRules: [
        (v) => {
          const emailRegex =
            // eslint-disable-next-line no-control-regex
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
          if (v.length > 0 && emailRegex.test(v)) {
            return true;
          } else {
            return "Please enter a valid email";
          }
        },
      ],
      passwordRules: [
        (v) => v.length >= 5 || "Password must be at least 5 characters long!",
      ],
      confirmPassRules: [
        (v) => v.length >= 5 || "Password must be at least 5 characters long!",
        (v) => v === this.password || "Passwords must match!",
      ],
      isLoading: false,
      error: false,
    };
  },
  methods: {
    async register() {
      const validation = await this.$refs.form.validate();
      if (!validation.valid) return;

      this.error = false;
      this.isLoading = true;

      try {
        await this.userStore.signup(this.email, this.password, this.name);
        this.$router.push("/login");
      } catch (error) {
        this.error = true;
        console.log("register error: ", error);
      }
      this.isLoading = false;
    },
  },
};
</script>
