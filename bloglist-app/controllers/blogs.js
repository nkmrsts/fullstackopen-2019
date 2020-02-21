const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require('../models/user')

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body
  const blog = new Blog({
    ...body,
    likes: body.likes === undefined ? 0 : body.likes
  });

  try {  
    const savedBlogs = await blog.save()
    response.status(201).json(savedBlogs)
  } catch (exception) {
    next(exception)
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    url: body.url
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
});

module.exports = blogsRouter;
