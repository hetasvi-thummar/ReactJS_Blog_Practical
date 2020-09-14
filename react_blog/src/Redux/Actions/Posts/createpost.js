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

        setModal(false);
        dispatch(fetchAllPosts());
        toast.success("successfully Created New Post!!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })

      .catch((error) => {
        dispatch({
          type: "CREATE_POST_FAILURE",
          message: error.message,
        });
        // error.response.data.message.map((error) =>
        //   error.messages.map((item) =>
        //     toast.error(item.message, {
        //       position: toast.POSITION.TOP_CENTER,
        //     })
        //   )
        // );
      });
  };
};
