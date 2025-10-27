import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import AddBlogForm from './AddBlogForm'
import { useAuthenticationValue } from '../AuthenticationContext'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'

const Blogs = () => {
  const user = useAuthenticationValue()
  const [addBlogVisible, setAddBlogVisible] = useState(false)

  const { data: blogs, isLoading, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: false,
    refetchOnWindowFocus: false
  })

  if (isLoading) {
    return <span>loading data...</span>
  }

  if (isError) {
    return <span>blog service not available due to problems in server</span>
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: addBlogVisible ? '' : 'none' }

  return (
    <div>
      <h2>Blogs</h2>
      <div style={hideWhenVisible} className="mb-3">
        <Button variant="secondary" onClick={() => setAddBlogVisible(true)}>new blog</Button>
      </div>
      <div style={showWhenVisible} className="mb-3">
        <AddBlogForm user={user} />
        <Button variant="secondary" onClick={() => setAddBlogVisible(false)} className="mt-2" >cancel</Button>
      </div>
      <Table striped>
        <tbody>
          {sortedBlogs.map(blog =>
            <tr key={blog.id}>
              <td><Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs