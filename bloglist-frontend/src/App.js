import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import User from './components/User'
import Users from './components/Users'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Navigation from './components/Navigation'
import { useBlogService } from './hooks/useBlogService'
import { useLoginService } from './hooks/useLoginService'

function App() {
  const { state: blogs, fetchBlogs } = useBlogService()
  const { state: loginUser, logout, loggedByLocalStorage } = useLoginService()

  useEffect(() => {
    fetchBlogs()
    loggedByLocalStorage()
  }, [])

  const blogById = (id) => blogs.find((blog) => blog.id === id)

  if (loginUser === null) {
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
        <Navigation loginUser={loginUser} logout={logout} />
        <h2>blogs</h2>
        <Notification />

        <Route exact path="/" render={() => <AllView />} />

        <Route exact path="/users" render={() => <Users />} />

        <Route
          exact
          path="/users/:id"
          render={({ match }) => <User id={match.params.id} />}
        />

        <Route
          exact
          path="/blogs/:id"
          render={({ match }) => (
            <Blog blog={blogById(match.params.id)} loginUser={loginUser} />
          )}
        />
      </div>
    </Router>
  )
}

export default App
