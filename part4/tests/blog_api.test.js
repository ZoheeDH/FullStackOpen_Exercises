const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper
    .initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs are returned', async () => {
  const blogs = await helper.blogsInDb()
  expect(blogs).toHaveLength(helper.initialBlogs.length)
})

test('the identifier prop is calles id', async () => {
  const blogs = await helper.blogsInDb()
  expect(blogs[0].id).toBeDefined()
})

test('a new blog can be added', async () => {
  const newBlog = {
    title: 'new blog',
    author: '<NAME>',
    url: 'newURL',
    likes: 5
  }

  await api
    .post('/api/blogs')
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

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blog = await helper.findOneBlog(newBlog.title)
  expect(blog.likes).toBe(0)
})

test('blog without title or url is not added', async () => {
  const blogWithoutTitle = {
    author: '<NAME>',
    url: 'newURL'
  }
  const blogWithoutUrl = {
    title: 'new blog',
    author: '<NAME>'
  }

  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(blogWithoutUrl)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})