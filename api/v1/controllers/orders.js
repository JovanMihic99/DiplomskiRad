const mongoose = require("mongoose");
const Order = require("../models/order");
const User = require("../models/user");

exports.orders_get_all = (req, res, next) => {
  res.status(200).json({
    message: "Fetched orders",
  });
};
exports.orders_create_order = (req, res, next) => {
  const userId = req.user._id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const shippingAddress = req.body.shippingAddress;
  const billingAddress = req.body.billingAddress;
  const products = req.user.cart;
  if (req.user.cart.length === 0) {
    res.status(400).json({
      error:
        "User cart must not be empty, please add an item to the cart before ordering",
    });
  } else {
    try {
      console.log("my products: ", products);
      const order = new Order({
        userId,
        products,
        firstName,
        lastName,
        shippingAddress,
        billingAddress,
      });
      order.save();
      User.findById(userId).then((user) => {
        user.cart = [];
        user.save();
      });
      // User.update({ _id: userId }, { $set: { cart: [] } }); //empty the cart upon successfull order
      console.log("My cart: ", req.user.cart);
      res.status(201).json({
        message: "Created order " + order._id,
        order: order,
      });
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    }
  }
};

exports.orders_get_user_orders = async (req, res, next) => {
  const userId = req.user._id;
  try {
    // populate orders
    let orders = await Order.find({ userId: userId }).populate(
      "products.productId"
    );

    // Transform orders to include product details and quantities
    orders = orders.map((order) => {
      const transformedProducts = order.products.map((p) => ({
        _id: p.productId._id,
        edition: p.productId.edition,
        title: p.productId.title,
        issue: p.productId.issue,
        description: p.productId.description,
        price: p.productId.price,
        imageUrl: p.productId.imageUrl,
        quantity: p.quantity,
      }));
      const returnOrder = { ...order.toObject() };
      delete returnOrder.__v;
      return {
        ...returnOrder,
        products: transformedProducts, // Replace products with transformed data
      };
    });

    res.status(200).json({
      message: "Fetched orders for user " + userId,
      orders: orders,
      count: orders.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

exports.orders_close_order = async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    await Order.findByIdAndUpdate(orderId, { isShipped: true });
    res.status(201).json({
      message: "Closed order " + orderId,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.orders_delete_order = async (req, res, next) => {
  const id = req.params.orderId;
  try {
    await Order.findByIdAndDelete(id);
    res.status(200).json({
      message: "Deleted order " + id,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};
