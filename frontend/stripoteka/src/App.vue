<template>
  <v-app>
    <the-header></the-header>

    <!-- <the-sidebar></the-sidebar> -->
    <v-main>
      <v-card class="py-5" elevation="3">
        <router-view></router-view>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>
