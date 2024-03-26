const _ = require('lodash')

const dummy = (blogs) => {return 1}

const total_likes = (blogs) => {
  const total = blogs.reduce((total, blog) => total + blog.likes, 0)
  return total
}

const favoriteBlog = (blogs) => {
  const initial = blogs[0]
  const favorite = blogs.reduce((prev, current) => {
    return prev.likes > current.likes
      ? prev
      : current
  }, initial)
  if (favorite){
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    }
  }
}

const mostBlogs = (blogs) => {
  const byAuthor = _.countBy(blogs, 'author')
  const listByAuthor = _.transform(
    byAuthor,
    function(result, value, key) {result.push({ author: key, blogs: value })}, [])
  if (listByAuthor.length > 0) {
    return _.maxBy(listByAuthor, 'blogs')
  }
}

const mostLikes = (blogs) => {
  if (blogs.length > 0) {
    const authorLikes = blogs.reduce((prev, current) => {
      if (prev || prev.author !== current.author) {
        const groupBy = blogs.filter((b) => b.author === current.author)
        const likes = groupBy.reduce((sum, blog) => sum + blog.likes, 0)
        console.log(prev)
        return prev.likes < likes
          ? { author: current.author, likes: likes }
          : prev
      }
    })
    return { author: authorLikes.author, likes: authorLikes.likes }
  }
}

module.exports = {
  dummy,
  total_likes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}