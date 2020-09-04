const initialState = {
  loading: false,
  edittag: null,
  error: false,
  message: null,
};

const editTagReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EDIT_PASTE_PENDING":
      return { ...state, loading: true, edittag: null };

    case "EDIT_PASTE_SUCCESS":
      return { ...state, loading: false, edittag: action.edittag };

    case "EDIT_PASTE_FAILURE":
      return { ...state, loading: false, error: true };

    default:
      return { ...state };
  }
};

export default editTagReducer;
