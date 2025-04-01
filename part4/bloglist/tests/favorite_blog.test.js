const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { listWithOneBlog, listWithSeveralBlogs } = require('../utils/test_helpers')

describe('favorite blog', () => {
  test('of empty list is zero', () => {
    const blogs = []

    const result = listHelper.favoriteBlog(blogs)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.favoriteBlog(listWithSeveralBlogs)
    assert.strictEqual(result, 12)
  })
})