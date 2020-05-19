import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUsersService } from '../hooks/useUsersService'

const Users = () => {
  const { users, fetchUsers } = useUsersService()

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map((user, index) => (
            <tr key={index}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
