const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const ProductsController = require("../controllers/products");

router.get("/", ProductsController.products_get_all);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  ProductsController.products_create_product
);

router.get("/:productId", ProductsController.products_get_product);

router.patch(
  "/:productId",
  authenticate,
  authorize("admin"),
  ProductsController.products_update_product
);

router.delete(
  "/:productId",
  authenticate,
  authorize("admin"),
  ProductsController.products_delete_product
);

router.post(
  "/products/edition",
  authenticate,
  authorize,
  ProductsController.products_add_edition
);
module.exports = router;
