import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import AddBlogForm from './AddBlogForm'
import Blog from './Blog'
import { useAuthenticationValue, useLogout } from '../AuthenticationContext'
import blogService from '../services/blogs'

const Blogs = () => {
  const user = useAuthenticationValue()
  const logout = useLogout()
  const [addBlogVisible, setAddBlogVisible] = useState(false)

  const { data: blogs, isLoading, isError } = useQuery({
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

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: addBlogVisible ? '' : 'none' }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged-in
        <button onClick={logout}>logout</button></p>
      <div style={hideWhenVisible}>
        <button onClick={() => setAddBlogVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible}>
        <AddBlogForm user={user} />
        <button onClick={() => setAddBlogVisible(false)}>cancel</button>
      </div>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
    </div>
  )
}

export default Blogs