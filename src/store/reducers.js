const initialState = {
  authToken: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log(action.payload);
      return {
        ...state, //copy all previous states
        authToken: action.payload,
      };
    case "LOGOUT":
      return {
        authToken: null,
      };
    // case "ERROR":

    default:
      return state;
  }
};
