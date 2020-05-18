import { createSlice } from '@reduxjs/toolkit'

const usersState = []

const usersSlice = createSlice({
  name: 'users',
  reducers: {
    setUsers: (state, action) => {
      return action.payload
    },
  },
  initialState: usersState,
})

const usersReducer = usersSlice.reducer
export const { setUsers } = usersSlice.actions
export default usersReducer
