import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { setUser } from './reducers/userReducer'
import { useBlogService } from './hooks/useBlogService'

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const { fetchBlogs } = useBlogService()

  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(setUser(null))
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  const AllView = () => (
    <div>
      <Togglable buttonLabel="new blog">
        <BlogForm />
      </Togglable>
      <Blogs />
    </div>
  )

  return (
    <Router>
      <div>
        <h2>blogs</h2>
        <Notification />
        <div>
          <span>{user.name} logged in</span>
          <button onClick={handleLogout}>logout</button>
        </div>

        <Route exact path="/" render={() => <AllView />} />

        <Route exact path="/users" render={() => <Users />} />
      </div>
    </Router>
  )
}

export default App
