const express = require("express");
const router = express.Router();
// const checkAuth = require("../middleware/check-auth");

// const OrdersController = require("../controllers/orders");

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "user" });
});

module.exports = router;
