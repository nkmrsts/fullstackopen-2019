import React, { useState, useEffect } from 'react'
import { useField } from './hooks'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

function App() {
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notificationHandler = (message, isError = false) => {
    setError(isError)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
      setError(false)
    }, 10000)
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
      notificationHandler(`logged in`, false)
    } catch (error) {
      notificationHandler(error.response.data.error, true)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const addNewBlog = event => {
    event.preventDefault()

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    blogService
      .create(newBlog)
      .then(data => {
        setBlogs(blogs.concat(data))
        title.reset()
        author.reset()
        url.reset()
        notificationHandler(
          `a new blog${data.title} by ${data.author} added`,
          false
        )
      })
      .catch(error => {
        notificationHandler(error.response.data.error, true)
      })
  }

  const likeBlog = blog => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    blogService
      .update(blog.id, newBlog)
      .then(returnedBlog => {
        setBlogs(
          blogs.map(_blog => (_blog.id !== blog.id ? _blog : returnedBlog))
        )
        notificationHandler(`update blog`, false)
      })
      .catch(error => {
        notificationHandler(error.response.data.error, true)
      })
  }

  const deleteBlog = blog => {
    const result = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (result) {
      blogService
        .deleteBlog(blog.id)
        .then(() => {
          setBlogs(blogs.filter(_blog => _blog.id !== blog.id))
          notificationHandler(`delete blog`, false)
        })
        .catch(error => {
          notificationHandler(error.response.data.error, true)
        })
    }
  }

  const handleSort = () => {
    setBlogs(blogs.slice().sort((a, b) => b.likes - a.likes))
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input {...username} name="Username" />
      </div>
      <div>
        password
        <input {...password} name="Password" />
      </div>
      <button type="submit">login</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMessage} isError={error} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} isError={error} />
      <div>
        <span>{user.name} logged in</span>
        <button onClick={handleLogout}>logout</button>
      </div>

      <Togglable buttonLabel="new blog">
        <BlogForm
          title={title}
          author={author}
          url={url}
          addNewBlog={addNewBlog}
        />
      </Togglable>
      <button onClick={handleSort}>sort</button>

      {blogs.map((blog, index) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          key={index}
          handleClickLike={likeBlog}
          handleClickDelete={deleteBlog}
        />
      ))}
    </div>
  )
}

export default App
