import React, { useEffect } from 'react'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { connect } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import { setBlogs } from './reducers/blogsReducer'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App(props) {
  useEffect(() => {
    blogService.getAll().then((initialBlogs) => props.setBlogs(initialBlogs))
  }, [props])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
  }, [props])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    props.setUser(null)
  }

  if (props.user === null) {
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
          <span>{props.user.name} logged in</span>
          <button onClick={handleLogout}>logout</button>
        </div>

        <Route exact path="/" render={() => <AllView />} />

        <Route exact path="/users" render={() => <Users />} />
      </div>
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs,
  }
}
const mapDispatchToProps = {
  setUser,
  setNotification,
  setBlogs,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
