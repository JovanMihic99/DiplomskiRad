<template>
  <h1>Login Page</h1>
  <v-card>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="4" class="ma-auto">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              :counter="10"
              label="Email"
              required
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4" class="ma-auto">
            <v-text-field
              type="password"
              v-model="password"
              :rules="passwordRules"
              :counter="10"
              label="Password"
              required
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-btn @click="logIn()" class="bg-blue ma-auto" text="Log in"></v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      email: null,
      emailRules: [
        (value) => {
          if (value) return true;
          return "You must enter an email!";
        },
      ],
      password: null,
      passwordRules: [
        (value) => {
          if (value) return true;
          return "You must enter a password!";
        },
      ],
    };
  },
  methods: {
    logIn() {
      return true;
    },
  },
};
</script>
