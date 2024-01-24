<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-img :src="imageUrl" height="200px" width="200px" cover></v-img>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ title }}</v-list-item-title>
      <v-list-item-subtitle>{{ price }}rsd.</v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-row align="center">
        <v-col cols="6">{{ quantity }}</v-col>
        <v-col cols="6">
          <v-btn icon @click="removeFromCart">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    title: String,
    imageUrl: String,
    price: Number,
    quantity: Number,
  },
  methods: {
    removeFromCart() {
      // Emit an event to signal that the item should be removed
      this.$emit("remove", this.title);
    },
  },
};
</script>
