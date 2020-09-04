const initialState = {
  loading: false,
  singlepost: null,
  error: false,
  message: null,
};

const fetchSinglePostReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SINGLE_POST_PENDING":
      return { ...state, loading: true, singlepost: null };

    case "SINGLE_POST_SUCCESS":
      return { ...state, loading: false, singlepost: action.singlepost };

    case "SINGLE_POST_FAILURE":
      return {
        ...state,
        loading: false,
        message: action.message,
        error: true,
        singlepost: null,
      };

    default:
      return { ...state };
  }
};

export default fetchSinglePostReducer;
