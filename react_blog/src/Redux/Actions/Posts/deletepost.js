import axios from "axios";
import { toast } from "react-toastify";
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
        toast.success("Your record is successfully deleted!!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })

      .catch((error) => {
        dispatch({
          type: "DELETE_POST_FAILURE",
          message: error.message,
        });
        error.response.data.message.map((error) =>
          error.messages.map((item) =>
            toast.error(item.message, {
              position: toast.POSITION.TOP_CENTER,
            })
          )
        );
      });
  };
};
