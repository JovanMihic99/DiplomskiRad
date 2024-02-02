const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") +
        "-" +
        file.originalname.replace(/ /g, "_")
    );
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("File must be a jpeg or png"), false);
  }
};
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

const ProductsController = require("../controllers/products");

router.get("/", ProductsController.products_get_all);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  upload.single("productImage"),
  ProductsController.products_create_product
);

router.get("/:productId", ProductsController.products_get_product);

router.post(
  "/:productId",
  authenticate,
  authorize("admin"),
  upload.single("productImage"),
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
  authorize("admin"),
  ProductsController.products_add_edition
);
module.exports = router;
