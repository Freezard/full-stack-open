import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { useSetNotification } from './NotificationContext'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const setNotification = useSetNotification()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification(error.response.data.error, 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleUserChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const { isLoading, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: false,
    refetchOnWindowFocus: false
  })

  if (isLoading) {
    return <span>loading data...</span>
  }

  if (isError) {
    return <span>anecdote service not available due to problems in server</span>
  }

  return (
    <div>
      <Notification />
      {user === null ?
        <LoginForm onSubmit={handleLogin} username={username} password={password}
          onChangeUser={handleUserChange} onChangePassword={handlePasswordChange} /> :
        <Blogs user={user} onHandleLogout={handleLogout} />
      }
    </div>
  )
}

export default App