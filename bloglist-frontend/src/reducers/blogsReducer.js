import { createSlice } from '@reduxjs/toolkit'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    concatBlog: (state, action) => {
      return state.concat(action.payload)
    },
    updateBlog: (state, action) => {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload.newBlog
      )
    },
    deleteBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload.id)
    },
    sortBlogs: (state, action) => {
      return state.slice().sort((a, b) => b.likes - a.likes)
    },
  },
})

const blogsReducer = blogsSlice.reducer

export const {
  setBlogs,
  concatBlog,
  updateBlog,
  deleteBlog,
  sortBlogs,
} = blogsSlice.actions
export default blogsReducer
