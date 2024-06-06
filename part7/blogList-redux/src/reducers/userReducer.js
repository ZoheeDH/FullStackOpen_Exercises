import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export const login = ({ username, password }) => {
  return async (dispatch) => {
    const userData = await loginService.login({ username, password })
    blogService.setToken(userData.token)
    dispatch(setUser(userData))
    return userData
  }
}

export const logout = () => {
  return (dispatch) => {
    blogService.setToken(null)
    dispatch(setUser(null))
  }
}

export default userSlice.reducer