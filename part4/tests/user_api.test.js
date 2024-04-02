const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')

describe('create user', () => {
  test('fails with code 400 if username or password is not valid', async () => {
    const invalidUsername = {
      username: 'u',
      name: 'foo',
      password: '<PASSWORD>'
    }
    const invalidPassword = {
      username: 'username',
      name: 'foo',
      password: 'p'
    }

    await api
      .post('/api/users')
      .send(invalidUsername)
      .expect(400)

    await api
      .post('/api/users')
      .send(invalidPassword)
      .expect(400)
  })
})