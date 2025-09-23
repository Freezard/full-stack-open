import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'
import { useAuthenticationValue } from './AuthenticationContext'
import {
  Routes, Route
} from 'react-router-dom'

const App = () => {
  const user = useAuthenticationValue()

  return (
    <div>
      <Notification />
      <Routes>
        {user === null ? (
          <Route path="*" element={<LoginForm />} />
        ) : (
          <>
            <Route path="/" element={<Blogs />} />
            <Route path="/users" element={<Users />} />
          </>
        )}
      </Routes>
    </div>
  )
}

export default App