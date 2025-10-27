import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSetNotification } from '../NotificationContext'
import { useState } from 'react'
import blogService from '../services/blogs'
import { useAuthenticationValue } from '../AuthenticationContext'
import { Form, Button } from 'react-bootstrap'

const AddBlogForm = () => {
  const queryClient = useQueryClient()
  const user = useAuthenticationValue()
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
      <Form onSubmit={addBlog}>
        <Form.Group className="mb-2">
          <Form.Label>title:</Form.Label>
          <Form.Control value={title} onChange={event => setTitle(event.target.value)}
            placeholder='Title' />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>author:</Form.Label>
          <Form.Control value={author} onChange={event => setAuthor(event.target.value)}
            placeholder='Author'/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>url:</Form.Label>
          <Form.Control value={url} onChange={event => setUrl(event.target.value)}
            placeholder='URL' />
        </Form.Group>
        <Button variant="primary" type="submit">create</Button>
      </Form>
    </div>
  )
}

export default AddBlogForm