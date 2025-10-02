import Blogs from './components/Blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import { useAuthenticationValue, useLogout } from './AuthenticationContext'
import {
  Routes, Route, Link, Navigate, useLocation
} from 'react-router-dom'

const App = () => {
  const user = useAuthenticationValue()
  const logout = useLogout()
  const location = useLocation()

  const padding = {
    padding: 5
  }

  return (
    <div>
      <Notification />
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user
          ? <em>{user.name} logged in <button onClick={logout}>logout</button></em>
          : <Link style={padding} to="/login" state={{ from: location.pathname }}>login</Link>
        }
      </div>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/users/:id" element={user ? <User /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  )
}

export default App