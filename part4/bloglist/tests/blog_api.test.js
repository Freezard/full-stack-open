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
    console.log('saved')
  }
})

test('the correct amount of blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, listWithSeveralBlogs.length)
})

after(async () => {
  await mongoose.connection.close()
})