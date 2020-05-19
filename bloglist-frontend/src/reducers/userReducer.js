import { createSlice } from '@reduxjs/toolkit'

const userState = []

const userSlice = createSlice({
  name: 'user',
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
  },
  initialState: userState,
})

const userReducer = userSlice.reducer
export const { setUser } = userSlice.actions
export default userReducer
