const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper
    .initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  await User.deleteMany({})
  const userObjects = helper
    .initialUsers
    .map(user => new User(user))
  const userPromises = userObjects.map(user => user.save())
  await Promise.all(userPromises)
})

describe('when there is initially some blogs', () => {
  test('blogs are returned as json', async () => {
    const user = await User.findOne({})
    const token = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET)

    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all blogs are returned', async () => {
    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
  })

  test('the identifier prop is called id', async () => {
    const blogs = await helper.blogsInDb()
    expect(blogs[0].id).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('a new blog can be added', async () => {
    const newBlog = {
      title: 'new blog',
      author: '<NAME>',
      url: 'newURL',
      likes: 5
    }

    const user = await User.findOne({})
    const token = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain('new blog')
  })

  test('the prop likes will be 0 by default', async () => {
    const newBlog = {
      title: 'new blog',
      author: '<NAME>',
      url: 'newURL'
    }

    const user = await User.findOne({})
    const token = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blog = await helper.findBlogByTitle(newBlog.title)
    expect(blog.likes).toBe(0)
  })

  test('fails with code 400 if no title or url', async () => {
    const blogWithoutTitle = {
      author: '<NAME>',
      url: 'newURL'
    }
    const blogWithoutUrl = {
      title: 'new blog',
      author: '<NAME>'
    }

    const user = await User.findOne({})
    const token = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogWithoutTitle)
      .expect(400)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogWithoutUrl)
      .expect(400)
  })

  test('fails with code 401 Unauthorized if no token is provided', async () => {
    const newBlog = {
      title: 'new blog',
      author: '<NAME>',
      url: 'newURL'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect({ error: 'Unauthorized' })
  })
})

describe('deletion of a blog', () => {
  test('a blog can be deleted', async () => {
    const blogs = await helper.blogsInDb()
    const blogToDelete = blogs[0]

    const user = await User.findById(blogToDelete.user)
    const token = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
  })
})

describe('update of a blog', () => {
  test('likes number can be updated', async () => {
    const blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[0]

    const user = await User.findById(blogToUpdate.user)
    const token = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET)

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blog = await helper.findBlogById(blogToUpdate.id)
    expect(blog.likes).toBe(updatedBlog.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})