import axios from "axios";
import { toast } from "react-toastify";

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

export const fetchSinglePost = (id) => {
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
        for (const a in error.response.data.data.errors) {
          error.response.data.data.errors[a].map((error) =>
            toast.error(error, {
              position: toast.POSITION.TOP_CENTER,
            })
          );
        }
      });
  };
};

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
      });
  };
};

export const editPost = (posts, id, setModal) => {
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
        toast.success("Post Update Successfully!!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })

      .catch((error) => {
        dispatch({
          type: "EDIT_POST_FAILURE",
          message: error.message,
        });

        for (const a in error.response.data.data.errors) {
          error.response.data.data.errors[a].map((error) =>
            toast.error(error, {
              position: toast.POSITION.TOP_CENTER,
            })
          );
        }
      });
  };
};
