import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'
import { useParams } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

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
      <h5>{user.name}</h5>
      <ListGroup>
        {user.blogs.map(blog =>
          <ListGroup.Item variant="secondary" key={blog.id}>{blog.title}</ListGroup.Item>
        )}
      </ListGroup>
    </div>
  )
}

export default User