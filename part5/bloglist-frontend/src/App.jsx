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
  
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [addBlogVisible, setAddBlogVisible] = useState(false)

  useEffect(() => {
    (async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    })()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title,
      author,
      url
    }

    try {  
      const returnedBlog = await blogService.create(blogObject)
      showNotification(
        `New blog added: ${returnedBlog.title} by ${returnedBlog.author}`, 'success')
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
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

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
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
        <Blogs blogs={blogs} user={user} onHandleLogout={handleLogout} title={title}
          onChangeTitle={handleTitleChange} author={author} onChangeAuthor={handleAuthorChange}
          url={url} onChangeUrl={handleUrlChange} onSubmitNewBlog={addBlog}
          addBlogVisible={addBlogVisible} setAddBlogVisible={setAddBlogVisible} />
      }
    </div>
  )
}

export default App