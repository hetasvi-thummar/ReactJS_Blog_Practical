const initialState = {
  loading: false,
  registerdata: null,
  error: false,
  message: null,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_DATA_PENDING":
      return { ...state, loading: true, registerdata: null };

    case "REGISTER_DATA_SUCCESS":
      return { ...state, loading: false };

    case "REGISTER_DATA_FAILURE":
      return { ...state, loading: false, message: action.message, error: true };

    default:
      return { ...state };
  }
};

export default registerReducer;
