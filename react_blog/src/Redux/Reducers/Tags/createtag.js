const initialState = {
  loading: false,
  newtag: null,
  error: false,
  message: null,
};

const createTagReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_TAG_PENDING":
      return { ...state, loading: true, newtag: null };

    case "CREATE_TAG_SUCCESS":
      return { ...state, loading: false };

    case "CREATE_TAG_FAILURE":
      return { ...state, loading: false, error: true };

    default:
      return { ...state };
  }
};

export default createTagReducer;
