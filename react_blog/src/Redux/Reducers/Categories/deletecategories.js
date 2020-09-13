const initialState = {
  loading: false,
  deletecategory: null,
  error: false,
  message: null,
};

const deleteCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_CATEGORY_PENDING":
      return { ...state, loading: true, deletecategory: null };

    case "DELETE_CATEGORY_SUCCESS":
      return { ...state, loading: false };

    case "DELETE_CATEGORY_FAILURE":
      return {
        ...state,
        loading: false,
        error: true,
        message: action.message,
        deletecategory: null,
      };

    default:
      return { ...state };
  }
};

export default deleteCategoryReducer;
