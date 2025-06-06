import { useState } from 'react'

const AddBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
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