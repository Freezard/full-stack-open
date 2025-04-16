import AddBlogForm from './AddBlogForm'
import Blog from './Blog'

const Blogs = (props) => {
  const { blogs, user, onHandleLogout, onSubmitNewBlog, title, onChangeTitle,
    author, onChangeAuthor, url, onChangeUrl, addBlogVisible, setAddBlogVisible } = props

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
        <AddBlogForm title={title} onChangeTitle={onChangeTitle} author={author} onChangeAuthor={onChangeAuthor}
          url={url} onChangeUrl={onChangeUrl} onSubmitNewBlog={onSubmitNewBlog} />
        <button onClick={() => setAddBlogVisible(false)}>cancel</button>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs