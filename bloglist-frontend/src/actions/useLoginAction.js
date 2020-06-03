import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoginUser, clearLoginUser } from '../reducers/loginUserReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useNotificationAction } from './useNotificationAction'

export const useLoginAction = () => {
  const state = useSelector((state) => state.loginUser)
  const dispatch = useDispatch()
  const { notifyMessage } = useNotificationAction()

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

  const loggedByLocalStorage = useCallback(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoginUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  return { state, login, logout, loggedByLocalStorage }
}
