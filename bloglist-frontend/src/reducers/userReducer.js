import { createSlice } from '@reduxjs/toolkit'

const userState = null

const userSlice = createSlice({
  name: 'user',
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    clearUser: (state, action) => {
      return null
    },
  },
  initialState: userState,
})

const userReducer = userSlice.reducer
export const { setUser } = userSlice.actions
export default userReducer
