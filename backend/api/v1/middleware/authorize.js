module.exports = (role) => (req, res, next) => {
  // checks if the user has the permisions to use resource
  if (req.user.role !== role) {
    res.status(403).json({
      message: "Not allowed",
    });
  }
  next();
};
