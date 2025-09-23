import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'
import { useAuthenticationValue, useLogout } from '../AuthenticationContext'

const Users = () => {
  const user = useAuthenticationValue()
  const logout = useLogout()

  const { data: users, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    retry: false,
    refetchOnWindowFocus: false
  })

  if (isLoading) {
    return <span>loading data...</span>
  }

  if (isError) {
    return <span>user service not available due to problems in server</span>
  }

  return (
    <div>
      <h2>Users</h2>
      <p>{user.name} logged-in
        <button onClick={logout}>logout</button></p>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td><b>blogs created</b></td>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users