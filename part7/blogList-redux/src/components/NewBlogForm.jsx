import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'

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
          title:
          <input
            id='title-input'
            type='text'
            value={blogTitle}
            name='title'
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='author-input'
            type='text'
            value={blogAuthor}
            name='author'
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='url-input'
            type='text'
            value={blogUrl}
            name='url'
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button id='create-blog' type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm