import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }  
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      console.log(err.message)
      setErrorMessage('Wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
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
      <p>{user.name} logged in</p>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </>
  )

  return (
    <div>
      <Notification msg={errorMessage} type='error'/> 

      {
      user === null
        ? loginForm()
        : blogList()
      }
    </div>
  )
}

export default App