const AddBlogForm = (props) => {
  const { onSubmitNewBlog, title, onChangeTitle,
    author, onChangeAuthor, url, onChangeUrl } = props

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onSubmitNewBlog}>
        <div>title:<input value={title} onChange={onChangeTitle} /></div>
        <div>author:<input value={author} onChange={onChangeAuthor} /></div>
        <div>url:<input value={url} onChange={onChangeUrl} /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AddBlogForm