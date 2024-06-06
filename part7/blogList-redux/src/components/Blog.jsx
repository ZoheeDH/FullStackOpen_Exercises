import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'
import PropTypes from 'prop-types'

const Blog = ({ blog, username }) => {
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [detailsVisible, setDetailsVisible] = useState('')
  const removeVisible = blog.user.username === username

  const hideDetails = { display: detailsVisible ? 'none' : '' }
  const showDetails = { display: detailsVisible ? '' : 'none' }
  const showRemove = { display: removeVisible ? '' : 'none' }

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  const handleUpdate = async () => {
    try {
      await dispatch(likeBlog(blog))
    } catch (err) {
      dispatch(setNotification({
        message: err.response.data.error,
        type: 'error'
      }))
    }
  }

  const handleRemove = async () => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await dispatch(removeBlog(blog.id))
        console.log('delete blog')
      }
    } catch (err) {
      dispatch(setNotification({
        message: err.response.data.error,
        type: 'error'
      }))
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div style={hideDetails}>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>view</button>
      </div>
      <div style={showDetails} className='blog-details'>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>hide</button>
        <br/>
        {blog.url}
        <br/>
        likes {blog.likes}
        <button className='like-button' onClick={handleUpdate}>like</button>
        <br/>
        {blog.user.username}
        <div style={showRemove}>
          <button id='remove-blog' onClick={handleRemove}>remove</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired
}

export default Blog