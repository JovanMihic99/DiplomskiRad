<template>
  <h1>Login Page</h1>
  <base-dialog v-if="error" title="Error" teleport="body">
    Authentification failed, please enter a valid email and password.
  </base-dialog>

  <v-form v-if="!isLoading" @submit.prevent="logIn()">
    <v-container>
      <v-row>
        <v-col cols="12" md="4" class="ma-auto">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="ma-auto">
          <v-text-field
            type="password"
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-btn
          type="submt"
          class="bg-blue ma-auto"
          :loading="isLoading"
          text="Log in"
        ></v-btn>
      </v-row>
    </v-container>
  </v-form>
  <div v-else class="d-flex justify-center">
    <v-progress-circular
      class="mt-3"
      indeterminate
      model-value="20"
      :size="80"
    ></v-progress-circular>
  </div>
</template>
<script>
import { useUserStore } from "@/stores/user";
export default {
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },
  data() {
    return {
      errorMessage: "",
      email: "",
      emailRules: [
        (value) => {
          if (value) return true;
          return "You must enter an email!";
        },
      ],
      password: "",
      passwordRules: [
        (value) => {
          if (value) return true;
          return "You must enter a password!";
        },
      ],
      isLoading: false,
      error: false,
    };
  },
  methods: {
    async logIn() {
      if (!this.email.length) {
        return;
      }
      if (!this.password.length) {
        return;
      }
      this.isLoading = true;
      try {
        await this.userStore.login(this.email, this.password);
        this.$router.go(-1);
      } catch (error) {
        this.error = true;
      }

      // errorMessage = res.message;

      this.isLoading = false;
    },
  },
};
</script>
