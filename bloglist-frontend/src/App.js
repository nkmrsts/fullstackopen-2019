import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { connect } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import { setBlogs } from './reducers/blogsReducer'

function App(props) {
  
  useEffect(() => {
    blogService.getAll().then(initialBlogs => props.setBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    props.setUser(null)
  }

  const handleSort = () => {
    props.setBlogs(props.blogs.slice().sort((a, b) => b.likes - a.likes))
  }

  if (props.user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification/>
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification/>
      <div>
        <span>{props.user.name} logged in</span>
        <button onClick={handleLogout}>logout</button>
      </div>

      <Togglable buttonLabel="new blog">
        <BlogForm />
      </Togglable>
      <button onClick={handleSort}>sort</button>

      <Blogs/>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    blogs: state.blogs
  };
};
const mapDispatchToProps = {
  setUser,
  setNotification,
  setBlogs
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
