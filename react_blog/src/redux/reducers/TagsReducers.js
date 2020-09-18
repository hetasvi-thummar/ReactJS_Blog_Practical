const initialState = {
  loading: false,
  alltags: null,
  error: false,
  message: null,
  singleTag: { loading: false, singletag: null },
  createTag: { loading: false, newtag: null, error: false, message: null },
  deleteTag: { loading: false, deletetag: null, error: false, message: null },
  editTag: { loading: false, edittag: null, error: false, message: null },
};

const fetchAllTagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_TAGS_PENDING":
      return { ...state, loading: true, alltags: null };

    case "ALL_TAGS_SUCCESS":
      return { ...state, loading: false, alltags: action.alltags };

    case "ALL_TAGS_FAILURE":
      return {
        ...state,
        loading: false,
        message: action.message,
        error: true,
        alltags: null,
      };

    case "SINGLE_TAG_PENDING":
      return { ...state, singleTag: { loading: true, singletag: null } };

    case "SINGLE_TAG_SUCCESS":
      return {
        ...state,
        singleTag: { loading: false, singletag: action.singletag },
      };

    case "SINGLE_TAG_FAILURE":
      return {
        ...state,
        singleTag: { loading: false, message: action.message, error: true },
      };

    case "CREATE_TAG_PENDING":
      return { ...state, createTag: { loading: true, newtag: null } };

    case "CREATE_TAG_SUCCESS":
      return { ...state, createTag: { loading: false } };

    case "CREATE_TAG_FAILURE":
      return {
        ...state,
        createTag: { loading: false, message: action.message, error: true },
      };
    case "DELETE_TAG_PENDING":
      return { ...state, deleteTag: { loading: true, deletetag: null } };

    case "DELETE_TAG_SUCCESS":
      return { ...state, deleteTag: { loading: false } };

    case "DELETE_TAG_FAILURE":
      return {
        ...state,
        deleteTag: {
          loading: false,
          error: true,
          message: action.message,
          deletetag: null,
        },
      };
    case "EDIT_TAG_PENDING":
      return { ...state, editTag: { loading: true, edittag: null } };

    case "EDIT_TAG_SUCCESS":
      return { ...state, editTag: { loading: false, edittag: action.edittag } };

    case "EDIT_TAG_FAILURE":
      return {
        ...state,
        editTag: { loading: false, message: action.message, error: true },
      };

    default:
      return { ...state };
  }
};

export default fetchAllTagsReducer;
