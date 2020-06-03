import { createSlice } from '@reduxjs/toolkit'

const notificationState = {
  message: null,
  error: false,
}

const notificationSlice = createSlice({
  name: 'notification',
  reducers: {
    setNotification: (state, action) => {
      const { message, error } = action.payload
      return {
        message,
        error,
      }
    },
    clearNotification: (state, action) => {
      return { message: null, error: false }
    },
  },
  initialState: notificationState,
})

const notificationReducer = notificationSlice.reducer
export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationReducer
