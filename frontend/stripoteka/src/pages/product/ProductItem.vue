<template>
  <v-card
    class="mx-auto"
    max-width="344"
    @click="productDetails(_id)"
    variant="tonal"
  >
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
      cover
    ></v-img>

    <v-card-title> {{ edition }} {{ title }} #{{ issue }} </v-card-title>

    <v-card-subtitle> {{ price }}rsd.</v-card-subtitle>

    <v-card-actions>
      <v-btn color="green-darken-1" variant="elevated" rounded>
        Dodaj u korpu
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn text="Detaljnije" rounded @click="productDetails(_id)"></v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: [
    "_id",
    "edition",
    "title",
    "issue",
    "description",
    "price",
    "imageUrl",
  ],
  data() {
    return {};
  },
  methods: {
    productDetails(id) {
      return id;
    },
    addToCart(id) {
      return id;
    },
  },
};
</script>
