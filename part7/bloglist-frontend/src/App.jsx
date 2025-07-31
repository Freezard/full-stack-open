import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useAuthenticationValue } from './AuthenticationContext'

const App = () => {
  const user = useAuthenticationValue()

  return (
    <div>
      <Notification />
      {user === null ?
        <LoginForm /> :
        <Blogs />
      }
    </div>
  )
}

export default App