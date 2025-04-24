import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'My first blog',
    author: 'Dan Roswell',
    url: 'urlthis',
    likes: 5,
    user: '67f5ba4b3d948966a854dfd3'
  }

  const user = {
    id: '67f5ba4b3d948966a854dfd3'
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  let div = container.querySelector('.blogDefault')
  expect(div).toHaveTextContent('My first blog')
  expect(div).toHaveTextContent('Dan Roswell')
  expect(div).not.toHaveTextContent('urlthis')
  expect(div).not.toHaveTextContent('5')

  div = container.querySelector('.blogExpanded')
  expect(div).toHaveTextContent('urlthis')
  expect(div).toHaveTextContent('5')
})