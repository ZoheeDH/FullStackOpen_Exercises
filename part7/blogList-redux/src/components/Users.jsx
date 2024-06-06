import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import userService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])
  const user = window.localStorage.getItem('loggedBlogAppUser')

  useEffect( () => {
    if (user) {
      userService.getAll().then(usersList =>
        setUsers(usersList)
      )
    }
  }, [])

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
          {users.map(user =>
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users