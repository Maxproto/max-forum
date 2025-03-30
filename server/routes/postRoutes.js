// server/routes/postRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../models/Post');

// Create a new post
router.post('/', auth, async (req, res) => {
  try {
    const { title, body } = req.body;
    const newPost = new Post({
      title,
      body,
      author: req.user.userId
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single post by ID
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('author', 'username')
      .populate('comments.author', 'username');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a post
router.put('/:postId', auth, async (req, res) => {
  try {
    const { title, body } = req.body;
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.postId, author: req.user.userId },
      { title, body },
      { new: true }
    );
    if (!updatedPost) return res.status(404).json({ message: 'Post not found or unauthorized' });
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a post
router.delete('/:postId', auth, async (req, res) => {
  try {
    const deletedPost = await Post.findOneAndDelete({
      _id: req.params.postId,
      author: req.user.userId
    });
    if (!deletedPost) return res.status(404).json({ message: 'Post not found or unauthorized' });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a comment
router.post('/:postId/comments', auth, async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = {
      author: req.user.userId,
      text
    };

    post.comments.push(comment);
    await post.save();

    // Populate author field for the newly added comment
    await post.populate('comments.author', 'username');

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
