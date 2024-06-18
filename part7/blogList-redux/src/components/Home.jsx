import { useRef } from 'react'
import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'
import { Link } from 'react-router-dom'
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'

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
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map(blog =>
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link to={`/blogs/${blog.id}`}>
                      {blog.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {blog.author}
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Home