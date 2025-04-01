var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sumLikes = (acc, cur) => {
    return acc + cur.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(sumLikes, 0)
}

const favoriteBlog = (blogs) => {
  const highestLikes = (acc, cur) => {
    return Math.max(acc, cur.likes)
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(highestLikes, 0)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}

  const authorBlogs = _.countBy(blogs, 'author')
  const authorBlogsArray = _.map(authorBlogs, (blogs, author) => ({ author, blogs }))
  const mostBlogs = _.maxBy(authorBlogsArray, 'blogs')

  return mostBlogs
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return 0

  const authorBlogs = _.groupBy(blogs, 'author')
  const authorTotalLikes = _.map(authorBlogs, (blogs, author) => ({
    author, likes: _.sumBy(blogs, 'likes')
  }))
  const mostLikes = _.maxBy(authorTotalLikes, 'likes')

  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}