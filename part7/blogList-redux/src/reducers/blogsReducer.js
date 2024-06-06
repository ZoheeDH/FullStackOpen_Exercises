import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      return [...state, action.payload]
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const id = action.payload.id
      return state.map((blog) => {
        return blog.id === id ? action.payload : blog
      })
    },
    deleteBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    }
  }
})

export const { appendBlog, setBlogs, updateBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addNewBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.addBlog(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  const updatedBlog = {
    ...blog,
    likes: blog.likes+1
  }
  return async (dispatch) => {
    const likedBlog = await blogService.updateBlog(updatedBlog)
    dispatch(updateBlog(likedBlog))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(deleteBlog(id))
  }
}

export default blogSlice.reducer