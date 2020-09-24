import axios from "axios";
import { toast } from "react-toastify";
import { Config, errorHandel } from "../../common";

const jwt = localStorage.getItem("jwt");

export const fetchAllTags = () => {
  return (dispatch) => {
    dispatch({ type: "ALL_TAGS_PENDING" });
    axios
      .get(`${Config.apiUrl}/tags`)

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
  return (dispatch) => {
    dispatch({ type: "SINGLE_TAG_PENDING" });
    axios
      .get(`${Config.apiUrl}/tags/${id}`, {
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
  return (dispatch) => {
    dispatch({ type: "CREATE_TAG_PENDING" });
    axios
      .post(`${Config.apiUrl}/tags`, tags, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })

      .then((res) => {
        dispatch({
          type: "CREATE_TAG_SUCCESS",
        });
        dispatch(fetchAllTags());
        toast.success("successfully Created New Tag!!");
        setModal(false);
      })

      .catch((error) => {
        dispatch({
          type: "CREATE_TAG_FAILURE",
          message: error.message,
        });
        errorHandel(error);
      });
  };
};

export const deleteTag = (id) => {
  return (dispatch) => {
    dispatch({ type: "DELETE_TAG_PENDING" });
    axios
      .delete(`${Config.apiUrl}/tags/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        dispatch({
          type: "DELETE_TAG_SUCCESS",
        });
        dispatch(fetchAllTags());

        toast.success("Record Deleted Successfully!!");
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
  return (dispatch) => {
    dispatch({ type: "EDIT_TAG_PENDING" });
    axios
      .put(`${Config.apiUrl}/tags/${id}`, tags, {
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
        toast.success("Tag Updated Successfully!!");
      })

      .catch((error) => {
        dispatch({
          type: "EDIT_TAG_FAILURE",
          message: error.message,
        });
        errorHandel(error);
      });
  };
};
