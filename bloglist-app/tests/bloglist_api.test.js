const supertest = require('supertest')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const helper = require('./test_helper.js')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    console.log('entered test')
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('the unique identifier property of the blog posts is named id', async () => {
    const resultBlogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    resultBlogs.body.map(blog => expect(blog).toBeDefined(blog.id))
  })

  test('a valid note can be added ', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'User1',
      url: 'test'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).toContain('async/await simplifies making async calls')
  })

  test('if request don\'t have likes property, added likes: 0', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'User1',
      url: 'test'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('if request missing title and url property, return http 400 response', async () => {
    const newBlog = {
      author: 'User1'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      await api.delete(`/api/blogs/${blogToDelete._id}`).expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

      const contents = blogsAtEnd.map(r => r._id)

      expect(contents).not.toContain(blogToDelete._id)
    })
  })

  describe('updating of a blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {
      const updateBlog = {
        title: 'async/await simplifies making async calls',
        url: 'test'
      }

      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const response = await api
        .put(`/api/blogs/${blogToUpdate._id}`)
        .send(updateBlog)
        .expect(200)

      expect(response.body._id).not.toBe(blogToUpdate._id)
      expect(response.body).not.toBe(blogToUpdate)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
