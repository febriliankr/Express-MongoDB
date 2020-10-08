const express = require("express");
const { update } = require("../models/Post");
const router = express.Router();
const Post = require("../models/Post");

// GET
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ title: -1 });
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

// POST
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// SPECIFIC POST

router.get("/:postId", async (req, res) => {
  const post = await Post.findById(req.params.postId);
  try {
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

// DELETE Post

router.delete("/:postId", async (req, res) => {
  const removedPost = await Post.remove({ _id: req.params.postId });
  try {
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// PATCH
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost)
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
