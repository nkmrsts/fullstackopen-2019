import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.message === null) {
    return null
  }

  return (
    <div className={notification.error ? 'notification error' : 'notification'}>
      {notification.message}
    </div>
  )
}

export default Notification
