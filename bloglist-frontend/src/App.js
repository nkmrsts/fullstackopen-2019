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
import { useBlogService } from './hooks/useBlogService'
import { useLoginService } from './hooks/useLoginService'

function App() {
  const { state: blogs, fetchBlogs, likeBlog, deleteBlog } = useBlogService()
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
        <h2>blogs</h2>
        <Notification />
        <div>
          <span>{loginUser.name} logged in</span>
          <button onClick={logout}>logout</button>
        </div>

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
            <Blog
              blog={blogById(match.params.id)}
              user={loginUser}
              handleClickLike={likeBlog}
              handleClickDelete={deleteBlog}
            />
          )}
        />
      </div>
    </Router>
  )
}

export default App
