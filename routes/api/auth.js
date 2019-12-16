const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");

// @router    GET api/auth
// @desc      Get current user
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); //returns everything except the password
    // console.log(req.user);
    res.json(user);
  } catch (e) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
