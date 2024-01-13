const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  edition: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  issue: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
});
module.exports = mongoose.model("Product", productSchema);
