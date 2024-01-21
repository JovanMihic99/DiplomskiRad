<template>
  <v-row class="mx-3 my-2" justify="center">
    <v-col v-for="p in products" :key="p._id" lg="4" md="6" sm="12">
      <product-item
        :_id="p._id"
        :edition="p.edition"
        :title="p.title"
        :issue="p.issue"
        :description="p.description"
        :price="p.price"
        :imageUrl="p.imageUrl"
      >
      </product-item>
    </v-col>
  </v-row>
</template>
<script>
import ProductItem from "./ProductItem.vue";
export default {
  components: {
    ProductItem,
  },
  data() {
    return {
      products: [
        {
          _id: "65a2f5dbb8f199847fd83305",
          edition: "Milki Dogi",
          title: "Vlaska Magija",
          issue: 7,
          description: "Milan dog juri vlajne",
          price: 15,
          imageUrl: "/",
        },
        {
          _id: "65a2f6678fc536cd6745d86f",
          edition: "Milan Dog",
          title: "Crna ruza",
          issue: 7,
          description: "Milan dog juri vlajne",
          price: 15,
          imageUrl: "/",
        },
        {
          _id: "65a2f72a8fc536cd6745d871",
          edition: "Milan Dog",
          title: "Vlaska Magija",
          issue: 7,
          description: "Milan dog juri vlajne",
          price: 15,
          imageUrl: "/",
        },
        {
          _id: "65a2f730d709f010fd673f20",
          edition: "Milan Dog",
          title: "Vlaska Magija",
          issue: 7,
          description: "Milan dog juri vlajne",
          price: 15,
          imageUrl: "/",
        },
        {
          _id: "65a2f7e7ac96afd63506e1db",
          edition: "Milan Dog",
          title: "Vlaska Magija",
          issue: 7,
          description: "Milan dog juri vlajne",
          price: 15,
          imageUrl: "/",
        },
        {
          _id: "65a2f816ed54f18534a217a9",
          edition: "Milan Dog",
          title: "Vlaska Magija",
          issue: 7,
          description: "Milan dog juri vlajne",
          price: 15,
          imageUrl: "/",
        },
        {
          _id: "65a2f832040e089261dbf938",
          edition: "Milan Dog",
          title: "Vlaska Magija",
          issue: 7,
          description: "Milan dog juri vlajne",
          price: 15,
          imageUrl: "/",
        },
        {
          _id: "65a2f83ae979fb724c79c430",
          edition: "Milan Dog",
          title: "Vlaska Magija",
          issue: 7,
          description: "Milan dog juri vlajne",
          price: 15,
          imageUrl: "/",
        },
        {
          _id: "65a2f8ee659d5045e55e326c",
          edition: "Milan Dog",
          title: "Vlaska Magija",
          issue: 7,
          description: "Milan dog juri vlajne",
          price: 15,
          imageUrl: "/",
        },
        {
          _id: "65a2f997c849cb5327c95154",
          edition: "Milan Dog",
          title: "Vlaska Magija",
          issue: 7,
          description: "Milan dog juri vlajne",
          price: 15,
          imageUrl: "/",
        },
        {
          _id: "65a2f9be46759695c257a157",
          edition: "Milan Dog",
          title: "Vlaska Magija",
          issue: 7,
          description: "Milan dog juri vlajne",
          price: 15,
          imageUrl: "/",
        },
        {
          _id: "65a2fbd7bebba7272d32f98a",
          edition: "Milan Dogic",
          title: "Vlaska Magija",
          issue: 7,
          description: "Milan dog juri vlajne",
          price: 15,
          imageUrl: "/",
        },
        {
          _id: "65a2fbe8096a8e4350cdefe4",
          edition: "Milan Dogic",
          title: "Vlaska Magija",
          issue: 7,
          description: "Milan dog juri vlajne",
          price: 15,
          imageUrl: "/",
        },
      ],
    };
  },
};
</script>
