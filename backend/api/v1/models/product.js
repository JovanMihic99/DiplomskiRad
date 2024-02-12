const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Edition = require("./edition");
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
productSchema.post("remove", removeProductFromCarts);
async function removeProductFromCarts(doc) {
  await User.updateMany(
    { "cart.productId": doc._id },
    { $pull: { cart: { productId: doc._id } } }
  );
}

productSchema.statics.getEditions = async function () {
  try {
    const editions = await this.distinct("edition").exec();
    return editions;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = mongoose.model("Product", productSchema);
