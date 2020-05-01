const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.user
    case 'CLEAR_USER':
      return null
    default:
      return state
  }
}

/*
 * action creators
 */
export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user,
  }
}

export const clearUser = () => {
  return {
    type: 'CLEAR_USER',
  }
}

export default userReducer
