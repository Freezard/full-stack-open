const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const { listWithSeveralBlogs, blogsInDb } = require('./test_helper')

const Blog = require('../models/blog')

describe('when there are some blogs saved initially', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    
    for (const blog of listWithSeveralBlogs) {
      const blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  test('the correct amount of blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, listWithSeveralBlogs.length)
  })

  test('the unique identifier property is named id', async () => {
    const blogs = await blogsInDb()

    assert(blogs.length > 0)
    assert(blogs[0].id)
  })

  describe('addition of a new blog', () => {
    test('a valid blog can be added ', async () => {
      const newBlog = {
        title: 'New Blog Post',
        author: 'Steven Mall',
        url: 'https://www.thisisarandomurl.com',
        likes: 50,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogs = await blogsInDb()
      assert.strictEqual(blogs.length, listWithSeveralBlogs.length + 1)

      const titles = blogs.map(blog => blog.title)
      assert(titles.includes('New Blog Post'))
    })

    test('property likes will default to zero if missing', async () => {
      const newBlog = {
        title: 'New Blog Post',
        author: 'Steven Mall',
        url: 'https://www.thisisarandomurl.com',
      }

      const blog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(blog.body.likes, 0)
    })

    test('400 Bad Request if title or url is missing', async () => {
      let newBlog = {
        author: 'Steven Mall',
        url: 'https://www.thisisarandomurl.com',
        likes: 50,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      newBlog = {
        title: 'New Blog Post',
        author: 'Steven Mall',
        likes: 50,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)    
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsBeforeDeletion = await blogsInDb()
      const blogToDelete = blogsBeforeDeletion[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAfterDeletion = await blogsInDb()
      assert.strictEqual(blogsAfterDeletion.length, listWithSeveralBlogs.length - 1)

      const titles = blogsAfterDeletion.map(blog => blog.title)
      assert(!titles.includes(blogToDelete.title))
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})