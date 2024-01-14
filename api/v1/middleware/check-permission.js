module.exports = (role) => (req, res, next) => {
  // checks if the user has the permisions to use resource
  if (req.user.role !== role) {
    res.status(401).json("Not authorized");
  }
  next();
};
