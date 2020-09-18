const initialState = {
  loading: false,
  posts: null,
  error: false,
  message: null,
  singlePost: { loading: false, singlepost: null, error: false, message: null },
  createPost: { loading: false, newpost: null, error: false, message: null },
  deletePost: { loading: false, deletepost: null, error: false, message: null },
  editPost: { loading: false, editpost: null, error: false, message: null },
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

    case "SINGLE_POST_PENDING":
      return { ...state, singlePost: { loading: true, singlepost: null } };

    case "SINGLE_POST_SUCCESS":
      return {
        ...state,
        singlePost: { loading: false, singlepost: action.singlepost },
      };

    case "SINGLE_POST_FAILURE":
      return {
        ...state,
        singlePost: {
          loading: false,
          message: action.message,
          error: true,
          singlepost: null,
        },
      };

    case "CREATE_POST_PENDING":
      return { ...state, createPost: { loading: true, newpost: null } };

    case "CREATE_POST_SUCCESS":
      return { ...state, createPost: { loading: false } };

    case "CREATE_POST_FAILURE":
      return {
        ...state,
        createPost: { loading: false, message: action.message, error: true },
      };

    case "DELETE_POST_PENDING":
      return { ...state, deletePost: { loading: true, deletepost: null } };

    case "DELETE_POST_SUCCESS":
      return { ...state, deletePost: { loading: false } };

    case "DELETE_POST_FAILURE":
      return {
        ...state,
        deletePost: {
          loading: false,
          error: true,
          message: action.message,
          deletepost: null,
        },
      };

    case "EDIT_POST_PENDING":
      return { ...state, editPost: { loading: true, editpost: null } };

    case "EDIT_POST_SUCCESS":
      return {
        ...state,
        editPost: { loading: false, editpost: action.editpost },
      };

    case "EDIT_POST_FAILURE":
      return {
        ...state,
        editPost: { loading: false, message: action.message, error: true },
      };

    default:
      return { ...state };
  }
};

export default fetchAllPostsReducer;
