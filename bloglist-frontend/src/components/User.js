import React, { useEffect } from 'react'
import { useUsersService } from '../hooks/useUsersService'

const User = ({ id }) => {
  const { user, fetchUser } = useUsersService()

  useEffect(() => {
    fetchUser(id)
  }, [fetchUser, id])

  if (user === null || user.id !== id) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog, index) => (
          <li key={index}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
