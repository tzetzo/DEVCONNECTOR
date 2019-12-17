const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @router    POST api/users
// @desc      Register/Sign up user
// @access    Public
router.post(
  "/",
  [
    //https://express-validator.github.io/docs/index.html
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    // Finds the validation errors in this request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Get user gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      user = new User({ name, email, avatar, password });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Register/save user in MongoDB
      await user.save();

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
