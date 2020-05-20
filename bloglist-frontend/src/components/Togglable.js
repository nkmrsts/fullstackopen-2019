import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const hideWhenVisible = () => (
    <div>
      <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
    </div>
  )

  const showWhenVisible = () => (
    <div className="ui segment">
      {props.children}
      <Button onClick={toggleVisibility}>cancel</Button>
    </div>
  )
  return visible ? showWhenVisible() : hideWhenVisible()
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
