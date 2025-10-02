import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'
import { useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id

  const { data: users, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    retry: false,
    refetchOnWindowFocus: false
  })

  if (!users) {
    return null
  }

  const user = users.find(u => u.id === id)

  if (isLoading) {
    return <span>loading data...</span>
  }

  if (isError) {
    return <span>user service not available due to problems in server</span>
  }

  return (
    <div>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User