const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({}).populate('user', { username:1, name:1 })

  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  const user = await User.findOne({})

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  await blog.save()

  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  res.status(201).json(blog)
})

blogsRouter.delete('/:id', async (req, res, next) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res, next) => {
  const { title, author, url, likes } = req.body
  const updatedPerson = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  )
  res.json(updatedPerson)

})

module.exports = blogsRouter