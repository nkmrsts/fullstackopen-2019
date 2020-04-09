/*
 * action creators
 */
export const setFilter = filter => {
  return {
    type: "SET_FILTER",
    filter
  };
};

const reducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.content;

    default:
      return state;
  }
};

export default reducer;
