const express = require("express");
const { validateUserId, validateUser, validatePost } = require("../middleware/middleware");
const User = require("../users/users-model");
const Post = require("../posts/posts-model");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.get();
    if (!users) {
      res.status(404).json({
        message: "no such user",
      });
    } else {
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(500).json({
      message: "problem finding user",
    });
  }
});

router.get("/:id", validateUserId, (req, res) => {
  try {
    const user = req.user
    if (!user) {
      res.status(404).json({
        message: "user not found",
      });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({
      message: "problem finding user",
    });
  }
  console.log("GET: ", req.user);
});

router.post("/", validateUser, async (req, res) => {
  try {
    const newUser = await User.insert({ name: req.name });
    if (!newUser) {
      res.status(404).json({
        message: "Failed to create user",
      });
    } else {
      console.log("Creating");
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(500).json({
      message: "problem finding user",
    });
  }
});

router.put("/:id", validateUserId, validateUser, async (req, res) => {
  try {    
    const user = await User.update(req.user.id, req.body);
    if (!user) {
      res.status(404).json({
        message: "Failed to update user",
      });
    } else {
      console.log("Updating User");
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({
      message: "problem finding user",
    });
  }
});

router.delete("/:id", validateUserId, async (req, res) => {
  try {
    const user = await User.remove(req.user.id);
    if (!user) {
      res.status(404).json({
        message: "Failed to delete user",
      });
    } else {
      console.log("Deleting");
      res.status(200).json(req.user);
    }
  } catch (err) {
    res.status(500).json({
      message: "problem finding user",
    });
  }
});

router.get("/:id/posts", validateUserId, async (req, res) => {
  try {
    const posts = await User.getUserPosts(req.user.id);
    if (!posts) {
      res.status(404).json({
        message: "Failed to get posts",
      });
    } else {
      console.log("Returning posts");
      res.status(200).json(posts);
    }
  } catch (err) {
    res.status(500).json({
      message: "problem finding posts",
    });
  }
});

router.post("/:id/posts", validateUserId, validatePost, async (req, res) => {
  try {
    const newPost = await Post.insert({text:req.text, user_id:req.user.id})
    if (!newPost) {
      res.status(404).json({
        message: "Failed to find posts",
      });
    } else {
      res.status(200).json(newPost);
    }
  } catch (err) {
    res.status(500).json({
      message: "problem finding posts",
    });
  }
});

module.exports = router;
