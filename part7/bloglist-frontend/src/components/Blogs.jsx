import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import AddBlogForm from './AddBlogForm'
import Blog from './Blog'
import { useAuthenticationValue, useLogout } from '../AuthenticationContext'

const Blogs = () => {
  const queryClient = useQueryClient()
  const logout = useLogout()
  const user = useAuthenticationValue()
  const blogs = queryClient.getQueryData(['blogs'])
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const [addBlogVisible, setAddBlogVisible] = useState(false)

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