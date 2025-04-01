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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}