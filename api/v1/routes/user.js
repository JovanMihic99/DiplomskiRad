const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const UserController = require("../controllers/user");

router.get("/", UserController.user_get_all);

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.get("/cart", checkAuth, UserController.user_get_cart);

router.post("/cart", checkAuth, UserController.user_add_to_cart);

module.exports = router;
