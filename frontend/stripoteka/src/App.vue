<template>
  <v-app theme="dark">
    <the-header></the-header>
    <v-main>
      <v-container>
        <v-card class="py-5" elevation="3">
          <v-scroll-y-transition mode="out" hide-on-leave="true">
            <router-view></router-view>
          </v-scroll-y-transition>
        </v-card>
      </v-container>
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
