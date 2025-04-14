const LoginForm = (props) => {
  const { onSubmit, username, onChangeUser, password, onChangePassword } = props

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={onSubmit}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={onChangeUser}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={onChangePassword}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm