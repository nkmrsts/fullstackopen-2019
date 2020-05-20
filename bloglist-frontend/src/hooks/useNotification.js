import { useDispatch } from 'react-redux'
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer'

export const useNotification = () => {
  const dispatch = useDispatch()

  const notifyMessage = (message, error = false) => {
    dispatch(setNotification({ message, error }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 10000)
  }
  return { notifyMessage }
}
