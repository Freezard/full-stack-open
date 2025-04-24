import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  const blog = {
    title: 'My first blog',
    author: 'Dan Roswell',
    url: 'urlthis',
    likes: 5,
    user: '67f5ba4b3d948966a854dfd3'
  }

  const blogUser = {
    id: '67f5ba4b3d948966a854dfd3'
  }

  const mockHandler = vi.fn()

  beforeEach(() => {
    container = render(<Blog blog={blog} user={blogUser} updateBlog={mockHandler} />).container
  })

  test('renders default content', async () => {
    const div = container.querySelector('.blogDefault')

    expect(div).toHaveTextContent('My first blog')
    expect(div).toHaveTextContent('Dan Roswell')
    expect(div).not.toHaveTextContent('urlthis')
    expect(div).not.toHaveTextContent('5')
  })

  test('renders expanded content', async () => {
    const div = container.querySelector('.blogExpanded')

    expect(div).toHaveTextContent('urlthis')
    expect(div).toHaveTextContent('5')
  })

  test('clicking like button twice will call the updateLike function twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})