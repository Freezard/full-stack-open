import { useState } from 'react'

const Blog = ({blog, updateBlog}) => {
  const [showInfoVisible, setShowInfoVisible] = useState(false)

  const likeBlog = (blog) => {
    updateBlog({
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1
    })
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: showInfoVisible ? 'none' : '' }
  const showWhenVisible = { display: showInfoVisible ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={() => setShowInfoVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={() => setShowInfoVisible(false)}>hide</button><br />
        {blog.url}<br />
        likes {blog.likes} <button onClick={() => likeBlog(blog)}>like</button><br />
        {blog.user.name}
      </div>
  </div>
)}

export default Blog