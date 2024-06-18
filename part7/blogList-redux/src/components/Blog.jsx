import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, commentBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Paper, TableBody, TableContainer, Table, TableRow, TableCell, TextField, Button, Link } from '@mui/material'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

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

  const handleComment = async (e) => {
    e.preventDefault()
    console.log(e)
    const comment = { content: e.target.comment.value }
    try {
      await dispatch(commentBlog(blog, comment))
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
      <Link href={blog.url} underline="hover">{blog.url}</Link>
      <br />
      {blog.likes} likes
      <Button variant="contained" size="small" onClick={handleLike}>like</Button>
      <br />
      added by {blog.user.username}
      <h3>Comments</h3>
      <form onSubmit={handleComment}>
        <TextField value={comment} name="comment" label="Comment" onChange={(e) => setComment(e.target.value)}/>
        <Button variant="contained" size="small" type='submit'>add comment</Button>
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blog.comments.map(comment =>
              <TableRow key={comment.id}>
                <TableCell >{comment.content}</TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Blog