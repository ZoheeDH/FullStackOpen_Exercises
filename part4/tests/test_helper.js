const Blog = require('../models/blog')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '660c818938017b9ef0747536',
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '660c818938017b9ef0747536',
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: '660c818938017b9ef0747536',
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: '660c818938017b9ef0747536',
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: '660c81e838017b9ef0747537',
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: '660c81e838017b9ef0747537',
    __v: 0
  }
]
const initialUsers = [
  {
    _id: '660c818938017b9ef0747536',
    username: 'Rob',
    name: 'Robert C. Martin',
    pwHash: '$2y$10$Zzg8zIC8YAHxcVoLa/h2I.WnpowG7DrP1mJrTtnchC9quGwe4uNdK',
    blogs: ['5a422a851b54a676234d17f7', '5a422aa71b54a676234d17f8', '5a422b3a1b54a676234d17f9', '5a422b891b54a676234d17fa']
  },
  {
    _id: '660c81e838017b9ef0747537',
    username: 'Chris',
    name: 'Chris Alexander',
    pwHash: '$2y$10$Z4P.bmSSub1b3obK2dvvVewXNeXaXsPPcgwcOht4pAUFuRXM3fL9u',
    blogs: ['5a422ba71b54a676234d17fb', '5a422bc61b54a676234d17fc']
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'anon', url: 'test', likes: 0 })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const findBlogByTitle = async (title) => {
  const blog = await Blog.findOne({ title })
  return blog.toJSON()
}

const findBlogById = async (_id) => {
  const blog = await Blog.findOne({ _id })
  return blog.toJSON()
}

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  nonExistingId,
  findBlogByTitle,
  findBlogById
}