const initialState = {
  loading: false,
  editcategory: null,
  error: false,
  message: null,
};

const editCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EDIT_CATEGORY_PENDING":
      return { ...state, loading: true, editcategory: null };

    case "EDIT_CATEGORY_SUCCESS":
      return { ...state, loading: false, editcategory: action.editcategory };

    case "EDIT_CATEGORY_FAILURE":
      return { ...state, loading: false, error: true };

    default:
      return { ...state };
  }
};

export default editCategoryReducer;
