import axios from "axios";
import { toast } from "react-toastify";

import { fetchAllPosts } from "./allpost";

export const createPost = (posts, setModal) => {
  const jwt = localStorage.getItem("jwt");

  return (dispatch) => {
    dispatch({ type: "CREATE_POST_PENDING" });
    axios
      .post(
        "https://infblogdemo.herokuapp.com/posts",
        posts,

        // {
        //   title: title,
        //   slug: slug,
        //   content: content,
        //    user: 1,
        //   categories: 13,
        //   tags: 109,
        // },

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
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
};
