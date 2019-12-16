const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token authenticity
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user; //saves the id of the user in req.user
    next();
  } catch (e) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
