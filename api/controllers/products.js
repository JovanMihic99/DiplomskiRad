const mongoose = require("mongoose");
const Product = require("../models/product");

exports.products_get_all = (req, res, next) => {
  Product.find()
    .select("edition title issue description price imageUrl")
    .exec()
    .then((products) => {
      const response = {
        count: products.length,
        products: products.map((p) => {
          return {
            ...p._doc,
          };
        }),
      };
      res.status(200).json({
        message: "Fetched products",
        response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
exports.products_create_product = (req, res, next) => {
  const product = new Product({
    edition: req.body.edition,
    title: req.body.title,
    issue: req.body.issue,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
  });
  product
    .save()
    .then((result) => {
      const createdProduct = {
        _id: result._doc._id,
        edition: result._doc.edition,
        title: result._doc.title,
        issue: result._doc.issue,
        description: result._doc.description,
        price: result._doc.price,
        imageUrl: result._doc.imageUrl,
      };
      res.status(201).json({
        message: "Created product " + result._id,
        product: createdProduct,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.products_get_product = (req, res, next) => {
  const id = req.params.productId;
  Product.findOne({ _id: id })
    .select("edition title issue description price imageUrl")
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "Fetched product " + id,
          product: result,
        });
      } else {
        res.status(404).json({ message: "No valid entry provided for id" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.products_update_product = (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const op of req.body) {
    updateOps[op.propName] = op.value;
  }
  Product.findByIdAndUpdate(id, { $set: updateOps }, { new: true })
    .then((result) => {
      res.status(200).json({
        message: "Updated product " + id,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.products_delete_product = (req, res, next) => {
  const id = req.params.productId;
  Product.deleteOne({ _id: id })
    .select("edition title issue description price imageUrl")
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Delted product " + id,
        _id: id,
        result,
      });
    });
};
