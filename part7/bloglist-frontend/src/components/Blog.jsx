import { useState } from 'react'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const [showInfoVisible, setShowInfoVisible] = useState(false)

  const likeBlog = (blog) => {
    updateBlog({
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1
    })
  }

  const handleDeleteBlog = (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteButtonStyle = {
    backgroundColor: '#ffaaaa',
    border: '1px solid red',
    color: 'darkred',
    borderRadius: 4
  }

  const hideWhenVisible = { display: showInfoVisible ? 'none' : '' }
  const showWhenVisible = { display: showInfoVisible ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div className='blogDefault' style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={() => setShowInfoVisible(true)}>view</button>
      </div>
      <div className='blogExpanded' style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={() => setShowInfoVisible(false)}>hide</button><br />
        {blog.url}<br />
        <span data-testid="likes">likes {blog.likes}</span>{' '}
        <button onClick={() => likeBlog(blog)}>like</button><br />
        {blog.user.name}<br />
        {user.id === blog.user.id &&
        <button style={deleteButtonStyle} onClick={() => handleDeleteBlog(blog)}>remove</button>
        }
      </div>
    </div>
  )}

export default Blog