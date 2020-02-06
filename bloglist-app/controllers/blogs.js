const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
});

blogsRouter.post("/", async (request, response, next) => {
  const blog = new Blog({
    ...request.body,
    likes: request.body.likes === undefined ? 0 : request.body.likes
  });
  
  try {
    const savedBlogs = await blog.save()
    response.status(201).json(savedBlogs)
  } catch (exception) {
    next(exception)
  }
});

module.exports = blogsRouter;
