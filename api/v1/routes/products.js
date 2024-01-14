const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const checkPermission = require("../middleware/check-permission");

const ProductsController = require("../controllers/products");

router.get("/", ProductsController.products_get_all);

router.post(
  "/",
  checkAuth,
  checkPermission("admin"),
  ProductsController.products_create_product
);

router.get("/:productId", ProductsController.products_get_product);

router.patch(
  "/:productId",
  checkAuth,
  checkPermission("admin"),
  ProductsController.products_update_product
);

router.delete(
  "/:productId",
  checkAuth,
  checkPermission("admin"),
  ProductsController.products_delete_product
);

module.exports = router;
