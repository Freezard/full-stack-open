const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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
    })
  })
})