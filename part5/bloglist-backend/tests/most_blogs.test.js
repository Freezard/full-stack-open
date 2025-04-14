const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { listWithOneBlog, listWithSeveralBlogs } = require('../utils/test_helpers')

describe('most blogs', () => {
  test('of empty list is empty', () => {
    const blogs = []

    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, {})
  })

  test('when list has only one blog, equals that one', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 1 })
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostBlogs(listWithSeveralBlogs)
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
  })
})