import React, { useState, useEffect } from 'react'
import { useField } from './hooks'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

function App() {
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null,
    error: false
  })

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

  const notificationHandler = (message, error = false) => {
    setNotification({ message, error })
    setTimeout(() => {
      setNotification({ message: null, error: false })
    }, 10000)
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
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

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
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
