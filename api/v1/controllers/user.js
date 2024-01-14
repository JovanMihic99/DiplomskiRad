const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Product = require("../models/product");

exports.user_get_all = (req, res, next) => {
  User.find()
    .select("name email")
    .exec()
    .then((users) => {
      const response = {
        count: users.length,
        users: users.map((u) => {
          return { name: u.name, email: u.email };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.user_signup = (req, res, next) => {
  //   console.log(req.body);
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Email already exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              name: req.body.name,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "User created " + result._id,
                  name: result.name,
                  email: result.email,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              _id: user._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
          });
        }
        return res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.user_add_to_cart = (req, res, next) => {
  const productId = req.body.productId;
  const quantity = parseInt(req.body.quantity);
  const updatedCart = [...req.user.cart];
  const productIndex = updatedCart.findIndex((pi) => {
    return pi.productId.toString() === productId.toString();
  });

  if (productIndex >= 0) {
    //item is in cart
    updatedCart[productIndex].quantity += quantity;
  } else {
    //item is not in cart
    updatedCart.push({
      productId: productId,
      quantity: quantity,
    });
  }
  User.findById(req.user._id).then((user) => {
    Product.findById(productId)
      .exec()
      .then((product) => {
        if (product) {
          // Product id is valid
          user.cart = updatedCart;
          user.save();
          res.status(201).json({
            message: "Product added to cart",
            productId: productId,
            quantity: quantity,
          });
        } else {
          // Product id is not valid
          res.status(404).json({
            error: "Product id is not valid",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });
};

exports.user_get_cart = (req, res, next) => {
  req.user
    .populate("cart.productId")
    .then((user) => {
      let products = [];
      const quantities = user.cart.map((item) => item.quantity); // extract quantities
      const productData = user.cart.map((item) => item.productId); // extract product information
      for (let i = 0; i < productData.length; i++) {
        delete productData[i]._doc.__v; // remove mongodb's __v property
        const product = productData[i]._doc;
        products.push({ ...product, quantity: quantities[i] }); // put productData and quantity into one object
      }
      res.status(200).json({
        message: "Fetched cart for user " + user._id,
        count: products.length,
        ...products,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
