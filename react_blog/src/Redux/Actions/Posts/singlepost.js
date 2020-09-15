import axios from "axios";

export const fetchSinglePost = (id) => {
  console.log(id);
  const jwt = localStorage.getItem("jwt");

  return (dispatch) => {
    dispatch({ type: "SINGLE_POST_PENDING" });
    axios
      .get(`https://infblogdemo.herokuapp.com/posts/${id}`)

      .then((res) => {
        dispatch({
          type: "SINGLE_POST_SUCCESS",
          singlepost: res.data,
        });
      })

      .catch((error) => {
        dispatch({
          type: "SINGLE_POST_FAILURE",
        });
      });
  };
};
