const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");

// @router    POST api/posts
// @desc      Create a post
// @access    Private
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // Finds the validation errors in this request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id, "name avatar"); //get only the name & avatar fields with the user;

      // Create the post
      let post = new Post({
        owner: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        date: Date.now()
      });

      post = await post.save();

      res.json(post);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
