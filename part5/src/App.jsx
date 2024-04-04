import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }  
  }, [user])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      setMessage('Wrong username or password')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType('success')
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    console.log('create')
    try{
      const newBlog = {
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl
      }

      const res = await blogService.addBlog(newBlog)
      setBlogs(blogs.concat(res))
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
    } catch(err){
      setMessage(err.response.data.error)
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType('success')
      }, 5000)
    }
  }

  const loginForm = () => (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username: 
            <input 
              type="text"
              value={username}
              name='Username'
              onChange={({target}) => setUsername(target.value)}
            />
        </div>
        <div>
          password: 
            <input 
              type="password"
              value={password}
              name='Password'
              onChange={({target}) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  const blogList = () => (
    <>
      <h2>Blogs</h2>
      <p>{user.name} logged in <button type='button' onClick={handleLogout}>logout</button></p>
      <form onSubmit={handleCreate}>
        <div>
          title: 
            <input 
              type='text'
              value={newBlogTitle}
              name='title'
              onChange={({target}) => setNewBlogTitle(target.value)}
            />
        </div>
        <div>
          author: 
            <input
              type='text'
              value={newBlogAuthor}  
              name='author'
              onChange={({target}) => setNewBlogAuthor(target.value)}
            />
        </div>
        <div>
          url: 
            <input
              type='text'
              value={newBlogUrl}  
              name='url'
              onChange={({target}) => setNewBlogUrl(target.value)}
            />  
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </>
  )

  return (
    <div>
      <Notification msg={message} type={messageType}/> 

      {
      user === null
        ? loginForm()
        : blogList()
      }
    </div>
  )
}

export default App