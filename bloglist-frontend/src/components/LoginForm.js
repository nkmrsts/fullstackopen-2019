import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks/useField'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = () => {
  const dispatch = useDispatch()

  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      username.reset()
      password.reset()
      dispatch(setUser(user))
      dispatch(setNotification(`logged in`, false))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, true))
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

export default LoginForm
