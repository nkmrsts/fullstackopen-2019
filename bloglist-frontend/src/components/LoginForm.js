import React from 'react'
import { useField } from '../hooks/useField'
import { useLoginService } from '../hooks/useLoginService'

const LoginForm = () => {
  const { login } = useLoginService()

  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    login(username.value, password.value)
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
