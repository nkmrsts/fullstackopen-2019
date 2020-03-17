import React from 'react'

const LoginForm = ({ username, password, handleLogin }) => (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input {...username} name="Username" />
    </div>
    <div>
      password
      <input {...password} name="Password" />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm
