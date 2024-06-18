import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Link, Navigate } from 'react-router-dom'

const Users = ({ usersList, user }) => {
  return (
    <div>
      {!user && (
        <Navigate to="/login" replace={true} />
      )}
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
              Blogs created
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList.map(user =>
              <TableRow key={user.id}>
                <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users