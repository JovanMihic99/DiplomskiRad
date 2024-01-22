const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Edition = require("./edition");
const productSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  edition: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  issue: {
    type: String,
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
