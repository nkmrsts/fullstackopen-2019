/*
 * action creators
 */
export const setNotification = content => {
  return dispatch => {
    dispatch({
      type: "SET",
      content
    });
    setTimeout(() => {
      dispatch({
        type: "CLEAR"
      });
    }, 5000);
  };
};

export const clearNotification = () => {
  return {
    type: "CLEAR"
  };
};

const reducer = (state = "", action) => {
  switch (action.type) {
    case "SET":
      return action.content;

    case "CLEAR":
      return "";

    default:
      return state;
  }
};

export default reducer;
