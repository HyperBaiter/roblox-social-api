const express = require("express");

const app = express();
app.use(express.json());

let posts = [];

// TESTE
app.get("/", (req, res) => {
  res.json({ status: "API ONLINE (Railway)" });
});

// GET POSTS
app.get("/posts", (req, res) => {
  res.json(posts);
});

// CREATE POST
app.post("/posts", (req, res) => {
  const { user, text } = req.body;
  if (!user || !text) {
    return res.status(400).json({ error: "invalid data" });
  }

  const post = {
    id: Date.now(),
    user,
    text,
    likes: 0,
    likedBy: [],
    time: Date.now()
  };

  posts.unshift(post);
  res.json(post);
});

// LIKE
app.post("/posts/:id/like", (req, res) => {
  const { user } = req.body;
  const post = posts.find(p => p.id == req.params.id);

  if (!post || !user) return res.json({ ok: false });

  if (!post.likedBy.includes(user)) {
    post.likedBy.push(user);
    post.likes++;
  }

  res.json({ likes: post.likes });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("API ONLINE NA PORTA", PORT);
});
