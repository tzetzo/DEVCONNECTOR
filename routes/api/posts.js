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

// @router    GET api/posts
// @desc      Get all posts
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// @router    GET api/posts/:post_id
// @desc      Get a single post by ID
// @access    Private
router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) return res.status(400).json({ msg: "Post not found" });

    res.json(post);
  } catch (e) {
    // console.error(e.message);
    if (e.kind == "ObjectId") {
      //this is run when the user ID is invalid ObjectId
      return res.status(400).json({ msg: "Post not found" });
    }

    res.status(500).send("Server Error");
  }
});

// @router    DELETE api/posts/:post_id
// @desc      Delete a single post by ID
// @access    Private
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(400).json({ msg: "Post not found" });

    // check if the post belongs to the current user
    if (post.owner.toString() !== req.user.id)
      return res.status(403).json({ msg: "Forbidden" });

    await post.remove();

    res.json({ msg: "Post deleted" });
  } catch (e) {
    // console.error(e.message);
    if (e.kind == "ObjectId") {
      //this is run when the user ID is invalid ObjectId
      return res.status(400).json({ msg: "Post not found" });
    }

    res.status(500).send("Server Error");
  }
});

module.exports = router;
