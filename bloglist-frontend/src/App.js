import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const formatNewBlog = () => ({
  title: '',
  author: '',
  url: ''
})

function App() {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState(formatNewBlog())
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
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

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notificationHandler(`logged in`, false)
    } catch (error) {
      notificationHandler(error.response.data.error, true)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const createNewBlog = event => {
    event.preventDefault()

    blogService
      .create(newBlog)
      .then(data => {
        setBlogs(blogs.concat(data))
        setNewBlog(formatNewBlog())
        notificationHandler(
          `a new blog${data.title} by ${data.author} added`,
          false
        )
      })
      .catch(error => {
        notificationHandler(error.response.data.error, true)
      })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
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
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>

      <BlogForm
        newBlog={newBlog}
        setNewBlog={setNewBlog}
        createNewBlog={createNewBlog}
      />

      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
