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
        avatar: user.avatar
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

// @router    PUT api/posts/like/:post_id
// @desc      Like a post
// @access    Private
router.put("/like/:post_id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);

    if (!post) return res.status(400).json({ msg: "Post not found" });

    const liked = post.likes.find(
      like => like.owner.toString() === req.user.id
    );

    if (liked) return res.status(403).json({ msg: "Post already liked" });

    post.likes.unshift({ owner: req.user.id });

    post = await post.save();

    res.json(post.likes);
  } catch (e) {
    console.error(e.message);
    if (e.kind == "ObjectId") {
      //this is run when the user ID is invalid ObjectId
      return res.status(400).json({ msg: "Post not found" });
    }

    res.status(500).send("Server Error");
  }
});

// @router    PUT api/posts/unlike/:post_id
// @desc      Unlike a post
// @access    Private
router.put("/unlike/:post_id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);

    if (!post) return res.status(400).json({ msg: "Post not found" });

    const liked = post.likes.find(
      like => like.owner.toString() === req.user.id
    );

    if (!liked) return res.status(403).json({ msg: "Post not liked yet" });

    post.likes = post.likes.filter(
      like => like.owner.toString() !== req.user.id
    );

    post = await post.save();

    res.json(post.likes);
  } catch (e) {
    console.error(e.message);
    if (e.kind == "ObjectId") {
      //this is run when the user ID is invalid ObjectId
      return res.status(400).json({ msg: "Post not found" });
    }

    res.status(500).send("Server Error");
  }
});

// @router    PUT api/posts/comment/:post_id
// @desc      Comment a post
// @access    Private
router.put(
  "/comment/:post_id",
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
      let post = await Post.findById(req.params.post_id);

      // Create & insert new comment
      post.comments.unshift({
        owner: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar
      });

      post = await post.save();

      res.json(post.comments);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);

// @router    DELETE api/posts/comment/:post_id/:comment_id
// @desc      Delete a comment
// @access    Private
router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    const comment = post.comments.find(
      comment => comment._id.toString() === req.params.comment_id
    );

    if (!comment) return res.status(404).json({ msg: "Comment not found" });

    // Check if user deleting the comment is the same as the user who created the comment
    if (req.user.id !== comment.owner.toString()) {
      return res.status(403).json({ msg: "Forbidden" });
    }

    post.comments = post.comments.filter(
      comment => comment._id.toString() !== req.params.comment_id
    );

    post = await post.save();

    res.json(post.comments);
  } catch (e) {
    console.error(e.message);
    if (e.kind == "ObjectId") {
      //this is run when the user ID is invalid ObjectId
      return res.status(404).json({ msg: "Not found" });
    }

    res.status(500).send("Server Error");
  }
});

module.exports = router;
