import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'

const User = ({ user }) => {
  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {user.blogs.map(blog =>
              <TableRow key={blog.id}>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.author}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default User