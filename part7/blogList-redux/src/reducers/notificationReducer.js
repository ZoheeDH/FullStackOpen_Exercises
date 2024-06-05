import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  type: ''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return initialState
    }
  }
})

export const { setMessage, clearNotification } = notificationSlice.actions

export const setNotification = ({ message, type }) => {
  return (dispatch) => {
    dispatch(setMessage({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export default notificationSlice.reducer