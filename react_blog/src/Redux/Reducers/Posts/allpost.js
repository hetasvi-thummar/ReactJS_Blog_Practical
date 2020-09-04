const initialState = {
  loading: false,
  posts: null,
  error: false,
  message: null,
};

const fetchAllPostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_POSTS_PENDING":
      return { ...state, loading: true, posts: null };

    case "ALL_POSTS_SUCCESS":
      return { ...state, loading: false, posts: action.posts };

    case "ALL_POSTS_FAILURE":
      return {
        ...state,
        loading: false,
        message: action.message,
        error: true,
        posts: null,
      };

    default:
      return { ...state };
  }
};

export default fetchAllPostsReducer;
