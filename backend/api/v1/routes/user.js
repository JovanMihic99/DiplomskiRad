const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const UserController = require("../controllers/user");

router.get("/", UserController.user_get_all);

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.get("/cart", authenticate, UserController.user_get_cart);

router.post("/cart", authenticate, UserController.user_add_to_cart);

router.delete("/cart/:id", authenticate, UserController.user_remove_from_cart);

router.patch("/cart", authenticate, UserController.user_edit_cart_item);

router.get(
  "/checkout-info",
  authenticate,
  UserController.user_get_checkout_info
);

router.post(
  "/checkout-info",
  authenticate,
  UserController.user_save_checkout_info
);

module.exports = router;
