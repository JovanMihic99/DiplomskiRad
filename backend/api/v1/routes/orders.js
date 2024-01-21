const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const OrdersController = require("../controllers/orders");

router.get(
  "/all",
  authenticate,
  authorize("admin"),
  OrdersController.orders_get_all
);

router.post("/", authenticate, OrdersController.orders_create_order);

router.get("/", authenticate, OrdersController.orders_get_user_orders);

router.patch(
  "/:orderId",
  authenticate,
  authorize("admin"),
  OrdersController.orders_close_order
);

router.delete("/:orderId", authenticate, OrdersController.orders_delete_order);

module.exports = router;
