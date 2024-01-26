<template>
  <!-- <div class="text-center">
    <v-menu :location="location">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" dark v-bind="props">
          <slot>Dropdown</slot>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="$router.push(`${item.to}`)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div> -->
  <div class="text-center">
    <v-menu open-on-click>
      <template v-slot:activator="{ props }">
        <v-btn append-icon="mdi-chevron-up" color="primary" v-bind="props">
          <slot>Dropdown</slot>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="$router.push(`${item.to}`)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    location: {
      type: String,
      default: "bottom",
      required: false,
    },
  },
};
</script>
Location bottom
