const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  Blog
    .find({})
    .then((blogs) => {res.json(blogs)})
})

blogsRouter.post('/', (req, res, next) => {
  if (!req.body.likes){
    req.body.likes = 0
  }
  const blog = new Blog(req.body)

  blog
    .save()
    .then(result => {
      res.status(201).json(result)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter