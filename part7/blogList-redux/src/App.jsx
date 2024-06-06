import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, addNewBlog, removeBlog } from './reducers/blogsReducer'
import { logout, setUser } from './reducers/userReducer'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import Login from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        dispatch(initializeBlogs( blogs ))
      )
    }
  }, [user])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const userData = JSON.parse(loggedUser)
      dispatch(setUser(userData))
      blogService.setToken(userData.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(logout())
  }

  const formRef = useRef()

  const blogList = () => (
    <>
      <p>{user.name} logged in <button type='button' onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel='add Blog' ref={formRef}>
        <NewBlogForm formRef={formRef}/>
      </Togglable>
      {[...blogs]
        .sort((a, b) =>  b.likes - a.likes )
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            username={user.username}
          />
        )}
    </>
  )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      {
        user === null
          ? <Login />
          : blogList()
      }
    </div>
  )
}

export default App