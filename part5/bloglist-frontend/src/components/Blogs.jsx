import { useState } from 'react'
import AddBlogForm from './AddBlogForm'
import Blog from './Blog'

const Blogs = (props) => {
  const { blogs, user, onHandleLogout, createBlog, updateBlog, deleteBlog } = props
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const [addBlogVisible, setAddBlogVisible] = useState(false)

  const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: addBlogVisible ? '' : 'none' }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged-in
        <button onClick={onHandleLogout}>logout</button></p>
      <div style={hideWhenVisible}>
        <button onClick={() => setAddBlogVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible}>
        <AddBlogForm createBlog={createBlog} />
        <button onClick={() => setAddBlogVisible(false)}>cancel</button>
      </div>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlog} deleteBlog={deleteBlog} />
      )}
    </div>
  )
}

export default Blogs