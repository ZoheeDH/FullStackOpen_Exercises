import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogsReducer'
import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'

const Home = ({ blogs }) => {
  const formRef = useRef()

  const listStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!blogs) return null

  return (
    <>
      <Togglable buttonLabel='add Blog' ref={formRef}>
        <NewBlogForm formRef={formRef} />
      </Togglable>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <div style={listStyle} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title}  {blog.author}
            </Link>
          </div>
        )}
    </>
  )
}

export default Home