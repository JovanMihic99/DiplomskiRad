const jwt = require("jsonwebtoken");
const User = require("../models/user");
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth Failed",
    });
  }
};
