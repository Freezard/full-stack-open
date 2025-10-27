import { useState } from 'react'
import { useLogin } from '../AuthenticationContext'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const login = useLogin()

  const handleSubmit = async (event) => {
    event.preventDefault()

    await login({ username, password })
    setPassword('')
  }

  const handleUserChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div>
      <h2>log in to application</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>username</Form.Label>
          <Form.Control
            data-testid='username'
            type="text"
            value={username}
            name="Username"
            onChange={handleUserChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>password</Form.Label>
          <Form.Control
            data-testid='password'
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">login</Button>
      </Form>
    </div>
  )
}

export default LoginForm