import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const hideWhenVisible = () => (
    <div>
      <button onClick={toggleVisibility}>{props.buttonLabel}</button>
    </div>
  )

  const showWhenVisible = () => (
    <div>
      {props.children}
      <button onClick={toggleVisibility}>cancel</button>
    </div>
  )
  return visible ? showWhenVisible() : hideWhenVisible()
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
