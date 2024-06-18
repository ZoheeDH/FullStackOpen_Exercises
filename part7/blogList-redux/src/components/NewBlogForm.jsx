import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, TextField } from '@mui/material'

const NewBlogForm = ({ formRef }) => {
  const dispatch = useDispatch()
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleCreate = async (event) => {
    try {
      event.preventDefault()
      formRef.current.toggleVisibility()
      const newBlog = {
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl
      }
      await dispatch(addNewBlog(newBlog))
      dispatch(setNotification({
        message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        type:'success'
      }))
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
    } catch (err) {
      dispatch(setNotification({
        message: err.response.data.error,
        type: 'error'
      }))
    }
  }

  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={handleCreate}>
        <div>
          <TextField
            id='title-input'
            type='text'
            value={blogTitle}
            label='Title'
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            id='author-input'
            type='text'
            value={blogAuthor}
            label='Author'
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            id='url-input'
            type='text'
            value={blogUrl}
            label='URL'
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <Button id='create-blog' variant="contained" size="small" type="submit">create</Button>
      </form>
    </div>
  )
}

export default NewBlogForm