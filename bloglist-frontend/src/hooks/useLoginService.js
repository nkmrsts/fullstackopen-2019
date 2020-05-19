import { useDispatch, useSelector } from 'react-redux'
import { setLoginUser, clearLoginUser } from '../reducers/loginUserReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useNotification } from './useNotification'

export const useLoginService = () => {
  const state = useSelector((state) => state.loginUser)
  const dispatch = useDispatch()
  const { notifyMessage } = useNotification()

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setLoginUser(user))
      notifyMessage(`logged in`, false)
      return user
    } catch (error) {
      notifyMessage(error.response.data.error, true)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(clearLoginUser())
  }

  const loggedByLocalStorage = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoginUser(user))
      blogService.setToken(user.token)
    }
  }
  return { state, login, logout, loggedByLocalStorage }
}
