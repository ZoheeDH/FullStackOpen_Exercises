import { Link, Navigate } from 'react-router-dom'

const Users = ({ usersList, user }) => {
  return (
    <div>
      {!user && (
        <Navigate to="/login" replace={true} />
      )}
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th scope="col" />
            <th scope="col">
              Blogs created
            </th>
          </tr>
        </thead>
        <tbody>
          {usersList.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users