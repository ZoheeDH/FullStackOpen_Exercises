import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogsReducer'
import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'
import Blog from './Blog'
import blogService from '../services/blogs'
import { Navigate, redirect } from 'react-router-dom'

const Home = ({ user }) => {
  const formRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        dispatch(initializeBlogs( blogs ))
      )
    }
  }, [user])

  return (
    <>
      <Togglable buttonLabel='add Blog' ref={formRef}>
        <NewBlogForm formRef={formRef} />
      </Togglable>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            username={user.username}
          />
        )}
    </>
  )
}

export default Home