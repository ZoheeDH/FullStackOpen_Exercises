const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'PasswordValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: error.message })
  } else {
    console.log(error)
  }
  next(error)
}

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  if (auth && auth.startsWith('Bearer ')) {
    const token = auth.replace('Bearer ', '')
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'Token invalid' })
    } else{
      req.token = decodedToken
    }
  } else {
    return null //res.status(403).json({ error: 'Access denied' })
  }
  next()
}

const userExtractor = async (req, res, next) => {
  const user = await User.findById(req.token.id)
  req.user = user
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}