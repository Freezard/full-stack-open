import Blog from './Blog'

const Blogs = (props) => {
  const { blogs, user, onHandleLogout, onSubmit, title, onChangeTitle,
    author, onChangeAuthor, url, onChangeUrl } = props

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onSubmit}>
        <div>title:<input value={title} onChange={onChangeTitle} /></div>
        <div>author:<input value={author} onChange={onChangeAuthor} /></div>
        <div>url:<input value={url} onChange={onChangeUrl} /></div>
        <button type="submit">create</button>
      </form>      
      <h2>blogs</h2>
      <p>{user.name} logged-in
        <button onClick={onHandleLogout}>logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs