import { useQuery } from '@tanstack/react-query'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import { useAuthenticationValue } from './AuthenticationContext'

const App = () => {
  const user = useAuthenticationValue()

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
    return <span>blog service not available due to problems in server</span>
  }

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