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
import { Navbar, Nav, Button } from 'react-bootstrap'

const App = () => {
  const user = useAuthenticationValue()
  const logout = useLogout()
  const location = useLocation()

  const padding = {
    color: '#FFF',
    textDecoration: 'none',
    padding: 5
  }

  return (
    <div className="container">
      <Notification />
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user
                ? <em>{user.name} logged in <Button variant="light" size="sm" onClick={logout}>logout</Button></em>
                : <Link style={padding} to="/login" state={{ from: location.pathname }}>login</Link>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
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