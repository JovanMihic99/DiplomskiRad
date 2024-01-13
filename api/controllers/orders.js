exports.orders_get_all = (req, res, next) => {
  res.status(200).json({
    message: "Fetched orders",
  });
};
exports.orders_create_order = (req, res, next) => {
  res.status(201).json({
    message: "Created order",
  });
};

exports.orders_get_order = (req, res, next) => {
  const id = req.params.orderId;
  res.status(200).json({
    message: "Fetched order " + id,
  });
};

// exports.orders_update_order = (req, res, next) => {
//   const id = req.params.productId;
//   res.status(201).json({
//     message: "Updated order " + id,
//   });
// };

exports.orders_delete_order = (req, res, next) => {
  const id = req.params.orderId;
  res.status(200).json({
    message: "Deleted order " + id,
  });
};
