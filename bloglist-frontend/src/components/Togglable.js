import React, { useState } from 'react'

const Togglable = props => {
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

export default Togglable
