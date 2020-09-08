import axios from "axios";
import { toast } from "react-toastify";

import { fetchAllPosts } from "./allpost";

export const createPost = (
  title,
  slug,
  content,

  setModal
) => {
  const jwt = localStorage.getItem("jwt");

  return (dispatch) => {
    dispatch({ type: "CREATE_POST_PENDING" });
    axios
      .post(
        "https://infblogdemo.herokuapp.com/posts",
        {
          title: title,
          slug: slug,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )

      .then((res) => {
        dispatch({
          type: "CREATE_POST_SUCCESS",
        });
        dispatch(fetchAllPosts());
        toast.success("successfully Created New Post!!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setModal(false);
      })

      .catch((error) => {
        dispatch({
          type: "CREATE_POST_FAILURE",
          message: error.message,
        });
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
};
