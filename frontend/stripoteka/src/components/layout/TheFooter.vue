<template>
  <v-footer class="d-flex flex-column mt-10">
    <div class="d-flex w-100 align-center px-4">
      <strong>Pridruži se stripoteci na socijalnim mrežama!</strong>

      <v-spacer></v-spacer>

      <v-btn
        v-for="icon in icons"
        :key="icon"
        class="mx-4"
        :icon="icon"
        variant="plain"
        size="small"
      ></v-btn>
    </div>

    <div class="px-4 py-2 text-center w-100">
      {{ new Date().getFullYear() }} — <strong>Stripoteka</strong>
    </div>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>
