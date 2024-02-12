<template>
  <div class="">
    <v-menu open-on-click>
      <template v-slot:activator="{ props }">
        <v-btn :append-icon="icon" @click="changeIcon" v-bind="props">
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
  data() {
    return {
      icon: "mdi-chevron-down",
    };
  },
  methods: {
    changeIcon() {
      if (this.icon === "mdi-chevron-down") {
        this.icon = "mdi-chevron-up";
      } else {
        this.icon = "mdi-chevron-down";
      }
    },
  },
};
</script>
Location bottom
