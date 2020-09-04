const initialState = {
  loading: false,
  alltags: null,
  error: false,
  message: null,
  singleTag: { loading: false, singletag: null },
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

    default:
      return { ...state };
  }
};

export default fetchAllTagsReducer;
