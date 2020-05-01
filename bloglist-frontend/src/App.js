import React, { useState, useEffect } from 'react'
import { useField } from './hooks'
import loginService from './services/login'
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
  const username = useField('text')
  const password = useField('password')
  
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

  const notificationHandler = (message, error = false) => {
    props.setNotification(message, error)
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
      props.setUser(user)
      username.reset()
      password.reset()
      notificationHandler(`logged in`, false)
    } catch (error) {
      notificationHandler(error.response.data.error, true)
    }
  }

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
        <LoginForm
          username={username.excludeReset}
          password={password.excludeReset}
          handleLogin={handleLogin}
        />
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
