const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.blogs
    default:
      return state
  }
}

/*
 * action creators
 */
export const setBlogs = (blogs) => {
  return {
    type: 'SET_BLOGS',
    blogs,
  }
}

export default blogsReducer
