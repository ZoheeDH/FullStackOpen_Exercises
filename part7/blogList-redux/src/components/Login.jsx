import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

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
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            id='username'
            type="text"
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input
            id='password'
            type="password"
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}

export default Login