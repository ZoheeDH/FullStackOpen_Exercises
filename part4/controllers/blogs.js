const blogsRouter = require('express').Router()
const { response } = require('express')
const Blog = require('../models/blog')
const Comment = require('../models/comment')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 })

  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog
    .findById(req.params.id)
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 })

  res.json(blog)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  const user = req.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  await blog.save()

  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  res.status(201).json(blog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const user = req.user
  const blogToDelete = await Blog.findById(req.params.id)
  if (blogToDelete.user.toString() === user.id) {
    await Blog.findByIdAndDelete(blogToDelete.id)
    res.status(204).end()
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
})

blogsRouter.put('/:id', async (req, res) => {
  console.log(req.body)
  const { title, author, url, likes, user, comments } = req.body
  const userId = user.id
  const commentsIds = comments.map((comment) => comment.id)
  const updatedPerson = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, author, url, likes, userId, commentsIds },
    { new: true, runValidators: true, context: 'query' }
  ).populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 })
  res.json(updatedPerson)
})

blogsRouter.post('/:id/comments', async (req, res) => {
  const id = req.params.id
  const comment = new Comment({
    content: req.body.content,
    blog: req.params.id,
  })

  await comment.save()
  const commentedBlog = await Blog.findById(id)
  const commentsIds = commentedBlog.comments.concat(comment._id)
  const updatedBlog = await Blog.findByIdAndUpdate
    (
      id,
      { comments: commentsIds },
      { new: true, runValidators: true, context: 'query' }
    )
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 })

  res.status(201).json(updatedBlog)
})

module.exports = blogsRouter