import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, update, remove, username }) => {
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

  const updateLikes = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes+1
    }
    update(updatedBlog)
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      remove(blog.id)
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
        <button className='like-button' onClick={updateLikes}>like</button>
        <br/>
        {blog.user.username}
        <div style={showRemove}>
          <button onClick={removeBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default Blog