const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const path = require("path");

const POSTS_FILE = path.join(__dirname, "data", "posts.json");
const COMMENTS_FILE = path.join(__dirname, "data", "comments.json");

app.get("/", (req, res) => {
  res.send("Blog API Running");
});

// Create Post
app.post("/posts", (req, res) => {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE));

  const newPost = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content
  };

  posts.push(newPost);

  fs.writeFileSync(
    POSTS_FILE,
    JSON.stringify(posts, null, 2)
  );

  res.json({ message: "Post Created" });
});

// Get All Posts
app.get("/posts", (req, res) => {
  const posts = JSON.parse(
    fs.readFileSync(POSTS_FILE)
  );

  res.json(posts);
});

// Delete Post
app.delete("/posts/:id", (req, res) => {
  let posts = JSON.parse(
    fs.readFileSync(POSTS_FILE)
  );

  posts = posts.filter(
    post => post.id != req.params.id
  );

  fs.writeFileSync(
    POSTS_FILE,
    JSON.stringify(posts, null, 2)
  );

  res.json({ message: "Post Deleted" });
});

// Add Comment
app.post("/comments", (req, res) => {
  const comments = JSON.parse(
    fs.readFileSync(COMMENTS_FILE)
  );

  const newComment = {
    id: Date.now(),
    postId: req.body.postId,
    comment: req.body.comment
  };

  comments.push(newComment);

  fs.writeFileSync(
    COMMENTS_FILE,
    JSON.stringify(comments, null, 2)
  );

  res.json({ message: "Comment Added" });
});

// Get Comments
app.get("/comments/:postId", (req, res) => {
  const comments = JSON.parse(
    fs.readFileSync(COMMENTS_FILE)
  );

  const result = comments.filter(
    c => c.postId == req.params.postId
  );

  res.json(result);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});