const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { listWithSeveralBlogs } = require('./test_helper')

const api = supertest(app)

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
  const response = await api.get('/api/blogs')

  assert(response.body.length > 0)
  assert(response.body[0].id)
})

after(async () => {
  await mongoose.connection.close()
})