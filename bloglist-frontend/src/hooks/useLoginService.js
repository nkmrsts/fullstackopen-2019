import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useNotification } from './useNotification'

export const useLoginService = () => {
  const state = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { notifyMessage } = useNotification()

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      notifyMessage(`logged in`, false)
      return user
    } catch (error) {
      notifyMessage(error.response.data.error, true)
    }
  }
  return { state, login }
}
