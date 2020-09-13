const initialState = {
  loading: false,
  newcategory: null,
  error: false,
  message: null,
};

const createCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_CATEGORY_PENDING":
      return { ...state, loading: true, newcategory: null };

    case "CREATE_CATEGORY_SUCCESS":
      return { ...state, loading: false };

    case "CREATE_CATEGORY_FAILURE":
      return { ...state, loading: false, message: action.message, error: true };

    default:
      return { ...state };
  }
};

export default createCategoryReducer;
