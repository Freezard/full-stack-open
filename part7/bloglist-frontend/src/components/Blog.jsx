import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSetNotification } from '../NotificationContext'
import blogService from '../services/blogs'
import { useAuthenticationValue } from '../AuthenticationContext'
import { useParams, useNavigate } from 'react-router-dom'

const Blog = () => {
  const id = useParams().id
  const queryClient = useQueryClient()
  const user = useAuthenticationValue()
  const setNotification = useSetNotification()
  const navigate = useNavigate()

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
      navigate('/')
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

  const { data: blogs } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: false,
    refetchOnWindowFocus: false
  })

  if (!blogs) {
    return null
  }

  const blog = blogs.find(b => b.id === id)

  if (!blog) {
    return null
  }

  const deleteButtonStyle = {
    backgroundColor: '#ffaaaa',
    border: '1px solid red',
    color: 'darkred',
    borderRadius: 4
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a><br />
      <span data-testid="likes">{blog.likes} likes</span>{' '}
      <button onClick={() => likeBlog(blog)}>like</button><br />
      added by {blog.user.name}<br />
      {user?.id === blog.user.id &&
      <button style={deleteButtonStyle} onClick={() => handleDeleteBlog(blog)}>remove</button>
      }
    </div>
  )}

export default Blog