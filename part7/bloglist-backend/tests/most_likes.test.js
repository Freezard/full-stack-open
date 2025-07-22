const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { listWithOneBlog, listWithSeveralBlogs } = require('./test_helper')

describe('most likes', () => {
  test('of empty list is zero', () => {
    const blogs = []

    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 5 })
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostLikes(listWithSeveralBlogs)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 })
  })
})