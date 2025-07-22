import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlogForm from './AddBlogForm'

test('adding a blog will call addBlog function with the right details', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<AddBlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('Title')
  const inputAuthor = screen.getByPlaceholderText('Author')
  const inputURL = screen.getByPlaceholderText('URL')
  const sendButton = screen.getByText('create')

  await user.type(inputTitle, 'My first Blog')
  await user.type(inputAuthor, 'Dan Roswell')
  await user.type(inputURL, 'urlthis')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('My first Blog')
  expect(createBlog.mock.calls[0][0].author).toBe('Dan Roswell')
  expect(createBlog.mock.calls[0][0].url).toBe('urlthis')
})