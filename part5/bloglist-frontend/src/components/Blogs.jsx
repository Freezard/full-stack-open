import Blog from './Blog'

const Blogs = ({ blogs, user, onHandleLogout }) => (
  <div>
    <h2>blogs</h2>
    <p>{user.name} logged-in
      <button onClick={onHandleLogout}>logout</button></p>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>  
)

export default Blogs