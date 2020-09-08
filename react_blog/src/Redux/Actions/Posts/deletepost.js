import axios from "axios";
import { toast } from "react-toastify";

import SweetAlert from "react-bootstrap-sweetalert";
import { fetchAllPosts } from "./allpost";

export const deletePost = (id) => {
  const jwt = localStorage.getItem("jwt");
  return (dispatch) => {
    dispatch({ type: "DELETE_POST_PENDING" });
    axios
      .delete(`https://infblogdemo.herokuapp.com/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        dispatch({
          type: "DELETE_POST_SUCCESS",
        });
        dispatch(fetchAllPosts());

        // toast.success("successfully deleted", {
        //   position: toast.POSITION.TOP_CENTER,
        // });
      })

      .catch((error) => {
        dispatch({
          type: "DELETE_POST_FAILURE",
          message: error.message,
        });
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
};
