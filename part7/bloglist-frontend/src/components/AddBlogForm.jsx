import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSetNotification } from '../NotificationContext'
import { useState } from 'react'
import blogService from '../services/blogs'

const AddBlogForm = ({ user }) => {
  const queryClient = useQueryClient()
  const setNotification = useSetNotification()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat({
        ...newBlog,
        user: {
          id: user.id,
          username: user.username,
          name: user.name
        }
      }))

      setNotification(`Blog created: ${newBlog.title} by ${newBlog.author}`)
    },
    onError: (error) => {
      setNotification(error.response.data.error, 'error')
    }
  })

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }

    setTitle('')
    setAuthor('')
    setUrl('')

    newBlogMutation.mutate(newBlog)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>title:<input value={title} onChange={event => setTitle(event.target.value)}
          placeholder='Title' /></div>
        <div>author:<input value={author} onChange={event => setAuthor(event.target.value)}
          placeholder='Author'/></div>
        <div>url:<input value={url} onChange={event => setUrl(event.target.value)}
          placeholder='URL' /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AddBlogForm