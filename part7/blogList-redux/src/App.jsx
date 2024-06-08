import { useEffect, useState } from 'react'
import {  Routes, Route, Navigate, useMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import Notification from './components/Notification'
import Login from './components/Login'
import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const [users, setUsers] = useState([])
  const matchUser = useMatch('/users/:id')
  const userById = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  const blogs = useSelector(state => state.blogs)
  const matchBlog = useMatch('/blogs/:id')
  const blogById = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const userData = JSON.parse(loggedUser)
      dispatch(setUser(userData))
      blogService.setToken(userData.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      userService.getAll().then(usersList =>
        setUsers(usersList)
      )
      blogService.getAll().then(blogs =>
        dispatch(initializeBlogs( blogs ))
      )
    }
  }, [user])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(logout())
  }

  return (
    <div>
      <div>
        <h2>Blogs</h2>
        {
          user
            ? <p>{user.name} logged in <button type='button' onClick={handleLogout}>logout</button></p>
            : null
        }
        <Notification />
      </div>

      <Routes>
        <Route path='/blogs/:id' element={<Blog blog={blogById} />} />
        <Route path='/users/:id' element={<User user={userById} />} />
        <Route path='/users' element={<Users usersList={users} user={user} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={
          user ? <Home blogs={blogs} />
            : <Navigate to={'/login'} replace={true} />
        } />
      </Routes>
    </div>
  )
}

export default App