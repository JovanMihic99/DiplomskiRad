<template>
  <div class="text-center">
    <!-- <v-btn
      color="primary"
      @click="dialog = true"
    >
      Open Dialog
    </v-btn> -->

    <v-dialog v-model="dialog" width="auto">
      <v-card :title="title">
        <v-card-text>
          <slot></slot>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close</v-btn>
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
  },
  mounted() {
    this.dialog = true;
  },
  data() {
    return {
      dialog: true,
    };
  },
};
</script>
