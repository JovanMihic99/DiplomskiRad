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
      // console.log(user);
      if (!user) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Authentication failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              _id: user._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1d",
            }
          );
          return res.status(200).json({
            message: "Authentication successful",
            token: token,
            _id: user._id,
            name: user.name,
            email: user.email,

            role: user.role,
          });
        }
        return res.status(401).json({
          message: "Authentication failed",
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
        items: [...products],
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.user_remove_from_cart = (req, res, next) => {
  const id = req.params.id;
  let updatedCart = [...req.user.cart];

  updatedCart = updatedCart.filter((item) => {
    return item.productId.toString() !== id;
  });
  req.user.cart = [...updatedCart];
  req.user
    .save()
    .then((result) => {
      console.log(req.user.cart);
      res.status(200).json({
        message: "Deleted item " + id + " from cart of user " + req.user._id,
        count: req.user.cart.length,
        items: [...req.user.cart],
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.user_edit_cart_item = (req, res, next) => {
  let updatedCart = [...req.user.cart];

  const productId = req.body.id;
  const quantity = req.body.quantity;
  const cartItemIndex = updatedCart.findIndex((item) => {
    return item.productId.toString() !== productId;
  });
  console.log(cartItemIndex);
  updatedCart[cartItemIndex].quantity = quantity;
  req.user.cart = [...updatedCart];
  req.user
    .save()
    .then(() => {
      console.log(req.user.cart);
      res.status(200).json({
        message:
          "Updated item " + productId + " from cart of user " + req.user._id,
        count: req.user.cart.length,
        items: [...req.user.cart],
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });

  // req.user.cart = [...updatedCart];
  // req.user
  //   .save()
  //   .then((result) => {
  //     console.log(req.user.cart);
  //     res.status(200).json({
  //       message: "Deleted item " + id + " from cart of user " + req.user._id,
  //       count: req.user.cart.length,
  //       items: [...req.user.cart],
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json({
  //       error: err,
  //     });
  //   });
};
