const initialState = {
  message: null,
  error: false,
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      const { message, error } = action.data
      return { message, error }
    case 'CLEAR_NOTIFICATION':
      return { message: null, error: false }
    default:
      return state
  }
}

/*
 * action creators
 */
export const setNotification = (message, error = false) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        error,
      },
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, 10000)
  }
}

export default notificationReducer
