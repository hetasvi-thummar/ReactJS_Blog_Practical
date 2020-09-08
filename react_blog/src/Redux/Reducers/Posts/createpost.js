const initialState = {
  loading: false,
  newpost: null,
  error: false,
  message: null,
};

const createPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_POST_PENDING":
      return { ...state, loading: true, newpost: null };

    case "CREATE_POST_SUCCESS":
      return { ...state, loading: false };

    case "CREATE_POST_FAILURE":
      return { ...state, loading: false, error: true };

    default:
      return { ...state };
  }
};

export default createPostReducer;
