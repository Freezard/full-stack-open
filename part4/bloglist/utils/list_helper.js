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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}