const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  extraInfo: {
    type: String,
  },
  postalCode: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Address", addressSchema);
