import { createSlice } from '@reduxjs/toolkit'

const loginUserState = null

const loginUserSlice = createSlice({
  name: 'loginUser',
  reducers: {
    setLoginUser: (state, action) => {
      return action.payload
    },
    clearLoginUser: (state, action) => {
      return null
    },
  },
  initialState: loginUserState,
})

const loginUserReducer = loginUserSlice.reducer
export const { setLoginUser, clearLoginUser } = loginUserSlice.actions
export default loginUserReducer
