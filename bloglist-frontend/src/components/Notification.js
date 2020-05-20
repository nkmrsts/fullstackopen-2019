import React from 'react'
import { useSelector } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.message === null) {
    return null
  }

  return (
    <Message success={!notification.error} error={notification.error}>
      {notification.message}
    </Message>
  )
}

export default Notification
