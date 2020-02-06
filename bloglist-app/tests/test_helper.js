const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Test1",
    author: "User1",
    url: "url",
    likes: 9
  },
  {
    title: "Test2",
    author: "User2",
    url: "url"
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}