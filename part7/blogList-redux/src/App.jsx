import { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Navigate
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setUser } from './reducers/userReducer'
import Notification from './components/Notification'
import Login from './components/Login'
import Home from './components/Home'
import Users from './components/Users'
import blogService from './services/blogs'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

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

  return (
    <Router>
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
        <Route path='/login' element={<Login />} />
        <Route path='/' element={
          user ? <Home user={user} />
            : <Navigate to={'/login'} replace={true} />
        } />
        <Route path='/users' element={ <Users />} />
      </Routes>

    </Router>
  )
}

export default App