const express = require("express");
const router = express.Router();
// const checkAuth = require("../middleware/check-auth");

const UserController = require("../controllers/user");

router.get("/", UserController.user_get_all);

router.post("/signup", UserController.user_signup);

module.exports = router;
