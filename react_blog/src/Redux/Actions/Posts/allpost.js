import axios from "axios";

export const fetchAllPosts = () => {
  return (dispatch) => {
    dispatch({ type: "ALL_POSTS_PENDING" });
    axios
      .get("https://infblogdemo.herokuapp.com/posts")

      .then((res) => {
        dispatch({
          type: "ALL_POSTS_SUCCESS",
          posts: res.data,
        });
      })

      .catch((error) => {
        dispatch({
          type: "ALL_POSTS_FAILURE",
        });
      });
  };
};
