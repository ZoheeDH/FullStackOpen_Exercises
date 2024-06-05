import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      return [...state, action.payload]
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export default blogSlice.reducer