<template>
  <v-app>
    <the-header></the-header>

    <!-- <the-sidebar></the-sidebar> -->
    <v-main>
      <router-view></router-view>
    </v-main>
    <the-footer></the-footer>
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
