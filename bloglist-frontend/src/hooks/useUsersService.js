import { useSelector, useDispatch } from 'react-redux'
import { setUsers } from '../reducers/usersReducer'
import usersService from '../services/users'

export const useUsersService = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.users)

  const fetchUsers = () => {
    usersService.getAll().then((users) => {
      dispatch(setUsers(users))
    })
  }

  return { state, fetchUsers }
}
