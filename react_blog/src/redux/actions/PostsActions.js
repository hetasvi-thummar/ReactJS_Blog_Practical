import axios from "axios";
import { toast } from "react-toastify";
import { Config, errorHandel } from "../../common";

const jwt = localStorage.getItem("jwt");

export const fetchAllPosts = () => {
  return (dispatch) => {
    dispatch({ type: "ALL_POSTS_PENDING" });
    axios
      .get(`${Config.apiUrl}/posts`)

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
      .get(`${Config.apiUrl}/posts/${id}`)

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
  return (dispatch) => {
    dispatch({ type: "CREATE_POST_PENDING" });
    axios
      .post(
        `${Config.apiUrl}/posts`,
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
        toast.success("successfully Created New Post!!");
      })

      .catch((error) => {
        dispatch({
          type: "CREATE_POST_FAILURE",
          message: error.message,
        });
        errorHandel(error);
      });
  };
};

export const deletePost = (id) => {
  return (dispatch) => {
    dispatch({ type: "DELETE_POST_PENDING" });
    axios
      .delete(`${Config.apiUrl}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })

      .then((res) => {
        dispatch({
          type: "DELETE_POST_SUCCESS",
        });
        dispatch(fetchAllPosts());
        toast.success("Your record is successfully deleted!!");
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
  return (dispatch) => {
    dispatch({ type: "EDIT_POST_PENDING" });
    axios
      .put(`${Config.apiUrl}/posts/${id}`, posts, {
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
        toast.success("Post Update Successfully!!");
      })

      .catch((error) => {
        dispatch({
          type: "EDIT_POST_FAILURE",
          message: error.message,
        });

        errorHandel(error);
      });
  };
};
