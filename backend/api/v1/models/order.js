const mongoose = require("mongoose");
// const Address = require("./address");
const Schema = mongoose.Schema;
const addressSchema = mongoose.Schema({
  city: { type: String, required: true },
  street: { type: String, required: true },
  houseNumber: { type: String, required: true },
  postalCode: { type: String, required: true },
});
const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        required: true,
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
  shippingAddress: {
    type: addressSchema,
    // required: true,
  },
  billingAddress: {
    type: addressSchema,
    // required: true,
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
