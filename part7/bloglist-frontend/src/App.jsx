import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: null })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    (async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    })()
  }, [])

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      showNotification(
        `New blog added: ${returnedBlog.title} by ${returnedBlog.author}`, 'success')
      setBlogs(blogs.concat({
        ...returnedBlog,
        user: {
          id: user.id,
          username: user.username,
          name: user.name
        }
      }))
    } catch (error) {
      showNotification(error.response.data.error, 'error')
    }
  }

  const updateBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.update(blogObject.id, blogObject)
      setBlogs(blogs.map(blog => blog.id === returnedBlog.id
        ? { ...returnedBlog, user: blog.user } : blog))
      showNotification(
        `Blog updated: ${returnedBlog.title} by ${returnedBlog.author}`, 'success')
    } catch (error) {
      showNotification(error.response.data.error, 'error')
    }
  }

  const deleteBlog = async (blogObject) => {
    try {
      await blogService.remove(blogObject.id)
      showNotification(
        `Blog deleted: ${blogObject.title} by ${blogObject.author}`, 'success')
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
    } catch (error) {
      showNotification(error.response.data.error, 'error')
    }
  }

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
      showNotification(error.response.data.error, 'error')
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

  const showNotification = (message, type, duration = 5000) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, duration)
  }

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
      {user === null ?
        <LoginForm onSubmit={handleLogin} username={username} password={password}
          onChangeUser={handleUserChange} onChangePassword={handlePasswordChange}/> :
        <Blogs blogs={blogs} user={user} onHandleLogout={handleLogout} createBlog={addBlog}
          updateBlog={updateBlog} deleteBlog={deleteBlog} />
      }
    </div>
  )
}

export default App