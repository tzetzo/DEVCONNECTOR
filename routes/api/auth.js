const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
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

// @router    POST api/auth
// @desc      Login/Sign in user
// @access    Public
router.post(
  "/",
  [
    //https://express-validator.github.io/docs/index.html
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    // Finds the validation errors in this request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // check if supplied password matches the one in the DB
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Return jsonwebtoken;
      // https://github.com/auth0/node-jsonwebtoken;
      // https://jwt.io/
      jwt.sign(
        {
          user: {
            id: user.id
          }
        },
        config.get("jwtSecret"),
        {
          expiresIn: 3600 * 30 * 24 * 60 * 60
        },
        (e, token) => {
          if (e) throw e;
          res.json({ token });
        }
      );
    } catch (e) {
      console.log(e.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
