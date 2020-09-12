import axios from "axios";
import { toast } from "react-toastify";
// import { fetchPaste } from "./fetchpaste";

import fetchAllPostsReducer from "../../Reducers/Posts/allpost";
import { fetchAllPosts } from "./allpost";

export const editPost = (
  posts,

  id,
  setModal
) => {
  const jwt = localStorage.getItem("jwt");

  return (dispatch) => {
    dispatch({ type: "EDIT_POST_PENDING" });
    axios
      .put(`https://infblogdemo.herokuapp.com/posts/${id}`, posts, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })

      .then((res) => {
        dispatch({
          type: "EDIT_POST_SUCCESS",
          editpost: res.data,
        });
        setModal(false);
        dispatch(fetchAllPosts());
        toast.success("successfully Updated!!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })

      .catch((error) => {
        dispatch({
          type: "EDIT_POST_FAILURE",
          message: error.message,
        });
        // toast.error(error.response.data.error, {
        //   position: toast.POSITION.TOP_CENTER,
        // });
        // setModal(true);
      });
  };
};
