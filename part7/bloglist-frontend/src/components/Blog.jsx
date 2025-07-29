import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSetNotification } from '../NotificationContext'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const [showInfoVisible, setShowInfoVisible] = useState(false)
  const queryClient = useQueryClient()
  const setNotification = useSetNotification()

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const updatedBlogs = blogs.map(blog =>
        blog.id !== updatedBlog.id ? blog : { ...updatedBlog, user: blog.user }
      )
      queryClient.setQueryData(['blogs'], updatedBlogs)

      setNotification(`Blog updated: ${updatedBlog.title} by ${updatedBlog.author}`)
    },
    onError: (error) => {
      setNotification(error.response.data.error, 'error')
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.filter(b => b.id !== blog.id))

      setNotification(`Blog deleted: ${blog.title} by ${blog.author}`)
    },
    onError: (error) => {
      setNotification(error.response.data.error, 'error')
    }
  })

  const likeBlog = (blog) => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const handleDeleteBlog = (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog.id)
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