const app = require("express").Router();
const { authMiddleware } = require("../utils/auth");
const { Blog } = require("../models/index");

//add a new blog
app.post("/",authMiddleware, async (req, res) => {
  try {
    const userId=req.user.id
    const { title, content } = req.body;
    const blog = await Blog.create({title, content,userId  });
    res.status(201).json(blog);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding blog", message: error.message });
  }
});

//get all blogs
app.get("/", async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } 
  catch (error) {
    res.status(500).json({ error: "Error retrieving blogs", message: error.message });
  }
});


app.get("/by_token", authMiddleware, async (req, res) => {
  try {
    const userId=req.user.id
    const blogs = await Blog.findAll({ where: { userId: userId} });
    res.json(blogs);
  } 
  catch (error) {
    res.status(500).json({ error: "Error retrieving blogs" });
  }
});

// update a blog
app.put("/:id",authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.update(
      { title, content },
      { where: { id: req.params.id } }
    );
    res.json(blog);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating blog", message: error.message });
  }
});

//  delete a blog
app.delete("/:id",authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.destroy({ where: { id: req.params.id, user_id: req.user.id } });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Error deleting blog", message: error.message });
  }
});

module.exports = app;
