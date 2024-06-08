import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const handleLike = async () => {
    try {
      await dispatch(likeBlog(blog))
    } catch (err) {
      dispatch(setNotification({
        message: err.response.data.error,
        type: 'error'
      }))
    }
  }

  if (!blog) return null
  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      {blog.likes} likes
      <button onClick={handleLike}>like</button>
      <br />
      added by {blog.user.username}
    </div>
  )
}

export default Blog