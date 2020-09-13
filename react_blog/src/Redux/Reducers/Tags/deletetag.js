const initialState = {
  loading: false,
  deletetag: null,
  error: false,
  message: null,
};

const deleteTagReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_TAG_PENDING":
      return { ...state, loading: true, deletetag: null };

    case "DELETE_TAG_SUCCESS":
      return { ...state, loading: false };

    case "DELETE_TAG_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
        message: action.message,
        deletetag: null,
      };

    default:
      return { ...state };
  }
};

export default deleteTagReducer;
