import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useField } from '../hooks/useField'
import { useLoginAction } from '../actions/useLoginAction'

const LoginForm = () => {
  const { login } = useLoginAction()

  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    login(username.value, password.value)
  }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Field>
        <label>username</label>
        <input {...username.excludeReset} name="username" />
      </Form.Field>
      <Form.Field>
        <label>password</label>
        <input {...password.excludeReset} name="password" />
      </Form.Field>
      <Button type="submit" primary>
        login
      </Button>
    </Form>
  )
}

export default LoginForm
