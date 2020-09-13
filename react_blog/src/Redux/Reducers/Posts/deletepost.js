const initialState = {
  loading: false,
  deletepost: null,
  error: false,
  message: null,
};

const deletePostReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_POST_PENDING":
      return { ...state, loading: true, deletepost: null };

    case "DELETE_POST_SUCCESS":
      return { ...state, loading: false };

    case "DELETE_POST_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
        message: action.message,
        deletepost: null,
      };

    default:
      return { ...state };
  }
};

export default deletePostReducer;
