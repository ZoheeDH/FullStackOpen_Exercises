import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

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

export const setNotification = (msg, t) => {
  return (dispatch) => {
    dispatch(setMessage(msg))
    setTimeout(() => {
      dispatch(clearNotification())
    }, t * 1000)
  }
}

export default notificationSlice.reducer