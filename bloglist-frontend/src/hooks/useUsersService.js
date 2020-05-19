import { useSelector, useDispatch } from 'react-redux'
import { setUsers } from '../reducers/usersReducer'
import { setUser } from '../reducers/userReducer'
import usersService from '../services/users'

export const useUsersService = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)

  const fetchUser = (id) => {
    usersService.getById(id).then((user) => {
      dispatch(setUser(user))
    })
  }

  const fetchUsers = () => {
    usersService.getAll().then((users) => {
      dispatch(setUsers(users))
    })
  }

  return { user, users, fetchUser, fetchUsers }
}
