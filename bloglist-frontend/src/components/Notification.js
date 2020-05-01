import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  if (props.message === null) {
    return null
  }

  return (
    <div className={props.error ? 'notification error' : 'notification'}>
      {props.message}
    </div>
  )
}

export default connect((state) => state.notification)(Notification)
