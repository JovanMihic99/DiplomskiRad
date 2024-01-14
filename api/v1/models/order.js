const mongoose = require("mongoose");
const Address = require("./address");
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
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  shippingAddressId: {
    type: Address,
    required: true,
  },
  billingAddress: {
    type: Address,
    required: true,
  },
  orderDate: {
    type: Date,
    default: new Date(),
  },
  isShipped: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Order", orderSchema);
