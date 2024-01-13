const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  billingAddress: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
    required: false,
    default: new Date(),
  },
  isShipped: {
    type: Boolean,
    required: false,
    default: false,
  },
});
module.exports = mongoose.model("Order", orderSchema);
