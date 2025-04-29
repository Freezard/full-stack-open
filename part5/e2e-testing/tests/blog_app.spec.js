const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, likeBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'Root',
        username: 'root',
        password: 'sekret'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')

      const notificationDiv = page.locator('.notification')
      await expect(notificationDiv).toContainText('invalid username or password')
      await expect(notificationDiv).toHaveCSS('border-style', 'solid')
      await expect(notificationDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'My first blog', 'Dan Roswell', 'urlthis')

      await expect(page.locator('.notification'))
        .toContainText('New blog added: My first blog by Dan Roswell')
      await expect(page.locator('.blogDefault').first())
        .toContainText('My first blog Dan Roswell')
    })

    describe('When a new blog has been created', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'My first blog', 'Dan Roswell', 'urlthis')
      })

      test('the blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('likes 0')).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 1')).toBeVisible()
      })

      test('the blog can be deleted by blog creator', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()

        page.once('dialog', async (dialog) => {
          expect(dialog.type()).toBe('confirm')
          expect(dialog.message()).toBe('Remove My first blog by Dan Roswell?')
          await dialog.accept()
        })
        await page.getByRole('button', { name: 'remove' }).click()

        await expect(page.locator('.notification'))
        .toContainText('Blog deleted: My first blog by Dan Roswell')
      })

      test('the blog cannot be deleted by another user', async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'root', 'sekret')

        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).toHaveCount(0)
      })
    })

    describe('When multiple blogs have been created', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'My first blog', 'Dan Roswell', 'urlthis')
        await createBlog(page, 'My second blog', 'Astrid Roswell', 'thisurl')
        await createBlog(page, 'My third blog', 'Mark Roswell', 'thaturl')
      })

      test('blogs are ordered by likes', async ({ page }) => {
        // Expand all blogs
        const blogsDefault = page.locator('.blogDefault')
        await blogsDefault.nth(0).getByRole('button', { name: 'view' }).click()
        await blogsDefault.nth(1).getByRole('button', { name: 'view' }).click()
        await blogsDefault.nth(2).getByRole('button', { name: 'view' }).click()

        await likeBlog(page, 'My first blog', 1)
        await likeBlog(page, 'My second blog', 3)
        await likeBlog(page, 'My third blog', 2)

        // Order from top should be: blog 2, blog 3, blog 1
        const orderedBlogs = page.locator('.blogExpanded')
        await expect(orderedBlogs.nth(0)).toContainText('My second blog')
        await expect(orderedBlogs.nth(1)).toContainText('My third blog')
        await expect(orderedBlogs.nth(2)).toContainText('My first blog')
      })
    })
  })
})