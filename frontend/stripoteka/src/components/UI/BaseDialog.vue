<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="auto"
      persistent
      transition="scale-transition"
    >
      <v-card :title="title">
        <v-card-text>
          <slot></slot>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    onClose: {
      type: Function,
      required: false,
    },
  },
  mounted() {
    this.dialog = true;
  },
  data() {
    return {
      dialog: true,
    };
  },
  methods: {
    closeDialog() {
      this.dialog = false;
      this.$emit("closedDialog");
    },
  },
};
</script>
