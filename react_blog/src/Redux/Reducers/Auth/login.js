const initialState = {
  loading: false,
  data: null,
  error: false,
  message: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_DATA_PENDING":
      return { ...state, loading: true, data: null };

    case "LOGIN_DATA_SUCCESS":
      return { ...state, loading: false };

    case "LOGIN_DATA_FAILURE":
      return { ...state, loading: false, message: action.message, error: true };

    default:
      return { ...state };
  }
};

export default loginReducer;
