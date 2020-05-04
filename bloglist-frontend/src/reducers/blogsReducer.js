import { createSlice } from '@reduxjs/toolkit'

const blogsState = []

const blogsSlice = createSlice({
  name: 'blogs',
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
  },
  initialState: blogsState,
})

const blogsReducer = blogsSlice.reducer
export const { setBlogs } = blogsSlice.actions
export default blogsReducer
