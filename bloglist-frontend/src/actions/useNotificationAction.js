import { useDispatch, useSelector } from 'react-redux'
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer'

export const useNotificationAction = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.notification)

  const notifyMessage = (message, error = false) => {
    dispatch(setNotification({ message, error }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
  const isShowNotification = state.message !== null

  return { notifyMessage, isShowNotification }
}
