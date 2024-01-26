<template>
  <!-- <v-list-item>
    <v-list-item-avatar>
      <v-img :src="imageUrl" height="8rem" width="8rem" cover></v-img>
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
  </v-list-item> -->

  <v-list-item>
    <v-row class="ma-auto">
      <v-col md="2" sm="4" cols="12">
        <v-img :src="imageUrl" cover></v-img>
      </v-col>
      <v-col md="4" sm="4" cols="12" class="text-h6">{{ title }} </v-col>
      <v-col md="2" sm="3">
        <span class="text-h6">{{ price * quantity }}rsd.</span>
      </v-col>

      <v-col md="2" cols="12"
        ><v-text-field
          v-model="qty"
          :disabled="!editMode"
          hide-details
          single-line
          type="number"
          label="quantity"
      /></v-col>
      <v-col md="2" cols="12">
        <v-btn icon @click="removeFromCart" text="Delete">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn icon @click="editMode = !editMode">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row :align="'center'"> </v-row>
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
  data() {
    return {
      editMode: false,
      qty: this.quantity,
    };
  },
  methods: {
    removeFromCart() {
      // Emit an event to signal that the item should be removed
      this.$emit("remove", this.title);
    },
  },
};
</script>
