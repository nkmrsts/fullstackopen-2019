import React, { useEffect } from 'react'
import { useUsersAction } from '../actions/useUsersAction'
import { Item, List } from 'semantic-ui-react'

const User = ({ id }) => {
  const { user, fetchUser } = useUsersAction()

  useEffect(() => {
    fetchUser(id)
  }, [fetchUser, id])

  if (user === null || user.id !== id) {
    return null
  }

  return (
    <Item.Group>
      <Item>
        <Item.Content>
          <Item.Header>{user.name}</Item.Header>
          <Item.Description>
            <p>added blogs</p>
            <List bulleted>
              {user.blogs.map((blog, index) => (
                <List.Item key={index}>{blog.title}</List.Item>
              ))}
            </List>
          </Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
  )
}

export default User
