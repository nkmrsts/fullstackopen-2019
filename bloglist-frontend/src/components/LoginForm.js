import React from 'react'
import { useField } from '../hooks'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { connect } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = (props) => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      username.reset()
      password.reset()
      props.setUser(user)
      props.setNotification(`logged in`, false)
    } catch (error) {
      props.setNotification(error.response.data.error, true)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input {...username.excludeReset} name="Username" />
      </div>
      <div>
        password
        <input {...password.excludeReset} name="Password" />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  setUser,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
