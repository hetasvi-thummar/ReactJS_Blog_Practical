import axios from "axios";
import { toast } from "react-toastify";

export const fetchAllTags = () => {
  return (dispatch) => {
    dispatch({ type: "ALL_TAGS_PENDING" });
    axios
      .get("https://infblogdemo.herokuapp.com/tags")

      .then((res) => {
        dispatch({
          type: "ALL_TAGS_SUCCESS",
          alltags: res.data,
        });
      })

      .catch((error) => {
        dispatch({
          type: "ALL_TAGS_FAILURE",
        });
      });
  };
};

export const fetchSingleTag = (id) => {
  const jwt = localStorage.getItem("jwt");

  return (dispatch) => {
    dispatch({ type: "SINGLE_TAG_PENDING" });
    axios
      .get(`https://infblogdemo.herokuapp.com/tags/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })

      .then((res) => {
        dispatch({
          type: "SINGLE_TAG_SUCCESS",
          singletag: res.data,
        });
      })

      .catch((error) => {
        dispatch({
          type: "SINGLE_TAG_FAILURE",
        });
      });
  };
};

export const createTag = (tags, setModal) => {
  const jwt = localStorage.getItem("jwt");

  return (dispatch) => {
    dispatch({ type: "CREATE_TAG_PENDING" });
    axios
      .post("https://infblogdemo.herokuapp.com/tags", tags, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })

      .then((res) => {
        dispatch({
          type: "CREATE_TAG_SUCCESS",
        });
        dispatch(fetchAllTags());
        toast.success("successfully Created New Tag!!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setModal(false);
      })

      .catch((error) => {
        dispatch({
          type: "CREATE_TAG_FAILURE",
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

export const deleteTag = (id) => {
  const jwt = localStorage.getItem("jwt");
  return (dispatch) => {
    dispatch({ type: "DELETE_TAG_PENDING" });
    axios
      .delete(`https://infblogdemo.herokuapp.com/tags/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        dispatch({
          type: "DELETE_TAG_SUCCESS",
        });
        dispatch(fetchAllTags());

        toast.success("Record Deleted Successfully!!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })

      .catch((error) => {
        dispatch({
          type: "DELETE_TAG_FAILURE",
          message: error.message,
        });
      });
  };
};

export const editTag = (tags, id, setModal) => {
  const jwt = localStorage.getItem("jwt");

  return (dispatch) => {
    dispatch({ type: "EDIT_TAG_PENDING" });
    axios
      .put(`https://infblogdemo.herokuapp.com/tags/${id}`, tags, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })

      .then((res) => {
        dispatch({
          type: "EDIT_TAG_SUCCESS",
          edittag: res.data,
        });
        setModal(false);
        dispatch(fetchAllTags());
        toast.success("Tag Updated Successfully!!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })

      .catch((error) => {
        dispatch({
          type: "EDIT_TAG_FAILURE",
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
