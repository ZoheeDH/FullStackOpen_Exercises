import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Navigate, useNavigate } from'react-router-dom'
import { Button, TextField } from '@mui/material'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    try {
      event.preventDefault()
      const userData = await dispatch(login({ username, password }))
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(userData)
      )
      setUsername('')
      setPassword('')
    } catch (err) {
      console.log('login error')
      dispatch(setNotification({
        message: 'Wrong username or password',
        type: 'error'
      }))
    }
  }

  return (
    <div>
      {window.localStorage.getItem('loggedBlogAppUser') && (
        <Navigate to="/" replace={true} />
      )}
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button variant='contained' color='primary' id='login-button' type="submit">
          login
        </Button>
      </form>
    </div>
  )
}

export default Login