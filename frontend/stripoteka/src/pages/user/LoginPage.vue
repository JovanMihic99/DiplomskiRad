<template>
  <div>
    <h1 class="text-h3 text-center">Login</h1>
    <base-dialog v-if="error" title="Error" teleport="#app">
      Authentification failed, please enter a valid email and password.
    </base-dialog>
    <v-form
      ref="form"
      class="pa-3 mt-5"
      v-if="!isLoading"
      @submit.prevent="logIn()"
    >
      <v-row>
        <v-col cols="12" md="4" class="ma-auto">
          <v-text-field
            prepend-inner-icon="mdi-email-outline"
            :rules="emailRules"
            v-model.trim.toLower="email"
            label="Email"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="ma-auto">
          <v-text-field
            prepend-inner-icon="mdi-lock-outline"
            :rules="passwordRules"
            type="password"
            v-model="password"
            label="Password"
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
          <v-btn
            @click="this.$router.push('/register')"
            prepend-icon="mdi-account-plus"
            class="w-100"
            variant="outlined"
            text="Register"
          ></v-btn>
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
    return {
      userStore: useUserStore(),
    };
  },

  data() {
    return {
      errorMessage: "",
      email: "",
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
      password: "",
      passwordRules: [
        (v) => {
          v.length >= 5 || "Password must be at least 5 characters long!";
        },
      ],
      isLoading: false,
      invalid: false,
      error: false,
    };
  },
  methods: {
    async logIn() {
      const validation = await this.$refs.form.validate();
      if (!validation.valid) return;

      this.error = false;
      this.isLoading = true;

      try {
        await this.userStore.login(this.email, this.password);
        this.$router.go(-1); //return to previous page
      } catch (error) {
        this.error = true;
        console.log(error);
      }
      this.isLoading = false;
    },

    // errorMessage = res.message;
  },
};
</script>
