const initialState = {
  loading: false,
  allcategories: null,
  error: false,
  message: null,
  singleCategory: { loading: false, singlecategory: null },
};

const fetchAllCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_CATEGORIES_PENDING":
      return { ...state, loading: true, allcategories: null };

    case "ALL_CATEGORIES_SUCCESS":
      return { ...state, loading: false, allcategories: action.allcategories };

    case "ALL_CATEGORIES_FAILURE":
      return {
        ...state,
        loading: false,
        message: action.message,
        error: true,
        allcategories: null,
      };

    case "SINGLE_CATEGORY_PENDING":
      return {
        ...state,
        singleCategory: { loading: true, singlecategory: null },
      };

    case "SINGLE_CATEGORY_SUCCESS":
      return {
        ...state,
        singleCategory: {
          loading: false,
          singlecategory: action.singlecategory,
        },
      };

    case "SINGLE_CATEGORY_FAILURE":
      return {
        ...state,
        singleCategory: {
          loading: false,
          message: action.message,
          error: true,
        },
      };

    default:
      return { ...state };
  }
};

export default fetchAllCategoriesReducer;
