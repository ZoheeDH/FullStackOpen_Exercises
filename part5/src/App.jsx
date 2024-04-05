import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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

  const handleLogin = async ({username, password}) => {
    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
    } catch (err) {
      setMessage('Wrong username or password')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType('success')
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
  }


  const formRef = useRef()

  const handleCreate = async (newBlog) => {
    try{
      formRef.current.toggleVisibility()
      await blogService.addBlog(newBlog)
      setBlogs(await blogService.getAll())
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch(err){
      setMessage(err.response.data.error)
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType('success')
      }, 5000)
    }
  }

  const handleUpdate = async (updatedBlog) => {
    try {
      await blogService.updateBlog(updatedBlog)
      setBlogs(await blogService.getAll())
    } catch(err){
      setMessage(err.response.data.error)
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType('success')
      }, 5000)
    }
  }

  const handleRemove = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    } catch (err) {
      setMessage(err.response.data.error)
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType('success')
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login' ref={formRef}>
        <Login handleLogin={handleLogin}/>
      </Togglable>
    )
  }

  const blogList = () => (
    <>
      <p>{user.name} logged in <button type='button' onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel='add Blog' ref={formRef}>
        <NewBlogForm createBlog={handleCreate} />
      </Togglable>
      {blogs
      .sort((a, b) =>  b.likes - a.likes )
      .map(blog => 
        <Blog 
          key={blog.id}
          blog={blog}
          update={handleUpdate}
          remove={handleRemove}
          username={user.username}
        />)}
    </>
  )

  return (
    <div>
      <h2>Blogs</h2>
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