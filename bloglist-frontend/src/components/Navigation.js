import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'

const Navigation = (props) => {
  return (
    <nav>
      <Menu>
        <Menu.Item link>
          <Link to="/">blogs</Link>
        </Menu.Item>
        <Menu.Item link>
          <Link to="/users">users</Link>
        </Menu.Item>
        <Menu.Item>
          <span>{props.loginUser.name} logged in</span>
        </Menu.Item>
        <Menu.Item>
          <Button onClick={props.logout}>logout</Button>
        </Menu.Item>
      </Menu>
    </nav>
  )
}

export default Navigation
