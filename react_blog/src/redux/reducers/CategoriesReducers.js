const initialState = {
  loading: false,
  allcategories: null,
  error: false,
  message: null,
  singleCategory: { loading: false, singlecategory: null },
  createCategory: {
    loading: false,
    newcategory: null,
    error: false,
    message: null,
  },
  deleteCategory: {
    loading: false,
    deletecategory: null,
    error: false,
    message: null,
  },
  editCategory: {
    loading: false,
    editcategory: null,
    error: false,
    message: null,
  },
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

    case "CREATE_CATEGORY_PENDING":
      return { ...state, createCategory: { loading: true, newcategory: null } };

    case "CREATE_CATEGORY_SUCCESS":
      return { ...state, createCategory: { loading: false } };

    case "CREATE_CATEGORY_FAILURE":
      return {
        ...state,
        createCategory: {
          loading: false,
          message: action.message,
          error: true,
        },
      };

    case "DELETE_CATEGORY_PENDING":
      return {
        ...state,
        deleteCategory: { loading: true, deletecategory: null },
      };

    case "DELETE_CATEGORY_SUCCESS":
      return { ...state, deleteCategory: { loading: false } };

    case "DELETE_CATEGORY_FAILURE":
      return {
        ...state,
        deleteCategory: {
          loading: false,
          error: true,
          message: action.message,
          deletecategory: null,
        },
      };
    case "EDIT_CATEGORY_PENDING":
      return { ...state, editCategory: { loading: true, editcategory: null } };

    case "EDIT_CATEGORY_SUCCESS":
      return {
        ...state,
        editCategory: { loading: false, editcategory: action.editcategory },
      };

    case "EDIT_CATEGORY_FAILURE":
      return {
        ...state,
        editCategory: { loading: false, message: action.message, error: true },
      };

    default:
      return { ...state };
  }
};

export default fetchAllCategoriesReducer;
