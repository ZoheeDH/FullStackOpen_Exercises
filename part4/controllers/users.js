const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({}, 'username name blogs id')
    .populate('blogs', { url:1, title:1, author:1 })
    .exec()
  res.json(users)
})

usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body

  if (password.length > 2) {
    const saltRounds = 10
    const pwHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      pwHash
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
  } else {
    const error = {
      name: 'ValidationError',
      message: 'Password validation failed: password must be at least 3 characters long'
    }
    next(error)
  }
})

module.exports = usersRouter