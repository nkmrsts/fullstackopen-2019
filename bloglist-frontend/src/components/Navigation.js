import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = (props) => {
  const navStyle = {
    listStyleType: 'none',
    display: 'flex',
    padding: '5px 0',
    background: 'gray',
  }
  const navItemStyle = {
    padding: '0 5px',
  }

  return (
    <nav>
      <ul style={navStyle}>
        <li style={navItemStyle}>
          <Link to={'/'}>blogs</Link>
        </li>
        <li style={navItemStyle}>
          <Link to={'/users'}>users</Link>
        </li>
        <li style={navItemStyle}>
          <span>{props.loginUser.name} logged in</span>
        </li>
        <li style={navItemStyle}>
          <button onClick={props.logout}>logout</button>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
