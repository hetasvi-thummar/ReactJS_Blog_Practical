const initialState = {
  loading: false,
  data: null,
  error: false,
  message: null,
  register: { loading: false, registerdata: null, error: false, message: null },
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_DATA_PENDING":
      return { ...state, loading: true, data: null };

    case "LOGIN_DATA_SUCCESS":
      return { ...state, loading: false };

    case "LOGIN_DATA_FAILURE":
      return {
        ...state,
        loading: false,
        message: action.message,
        error: true,
      };

    case "REGISTER_DATA_PENDING":
      return { ...state, register: { loading: true, registerdata: null } };

    case "REGISTER_DATA_SUCCESS":
      return { ...state, register: { loading: false } };

    case "REGISTER_DATA_FAILURE":
      return {
        ...state,
        register: { loading: false, message: action.message, error: true },
      };

    default:
      return { ...state };
  }
};

export default AuthReducer;
