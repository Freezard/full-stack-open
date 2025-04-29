const { expect } = require('@playwright/test')

const loginWith = async (page, username, password)  => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url)  => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByPlaceholder('Title').fill(title)
  await page.getByPlaceholder('Author').fill(author)
  await page.getByPlaceholder('URL').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByRole('button', { name: 'cancel' }).click()
  await page.locator('.blogDefault', { hasText: title }).waitFor()
}

const likeBlog = async (page, title, times, initialLikes = 0)  => {
  const blogExpanded = page.locator('.blogExpanded', { hasText: title })
  const likeButton = blogExpanded.getByRole('button', { name: 'like' })

  for (let i = 0; i < times; i++) {
    await likeButton.click()
    await expect(blogExpanded.getByTestId('likes')).toHaveText(`likes ${initialLikes + i + 1}`)
  }
}

export { loginWith, createBlog, likeBlog }