import axios from "axios";
import { toast } from "react-toastify";
import { Config, errorHandel } from "../../common";

const jwt = localStorage.getItem("jwt");

export const fetchAllCategories = () => {
  return (dispatch) => {
    dispatch({ type: "ALL_CATEGORIES_PENDING" });
    axios
      .get(`${Config.apiUrl}/categories`)

      .then((res) => {
        dispatch({
          type: "ALL_CATEGORIES_SUCCESS",
          allcategories: res.data,
        });
      })

      .catch((error) => {
        dispatch({
          type: "ALL_CATEGORIES_FAILURE",
        });
      });
  };
};

export const fetchSingleCategory = (id) => {
  return (dispatch) => {
    dispatch({ type: "SINGLE_CATEGORY_PENDING" });
    axios
      .get(`${Config.apiUrl}/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })

      .then((res) => {
        dispatch({
          type: "SINGLE_CATEGORY_SUCCESS",
          singlecategory: res.data,
        });
      })

      .catch((error) => {
        dispatch({
          type: "SINGLE_CATEGORY_FAILURE",
        });
      });
  };
};

export const createCategory = (categories, setModal) => {
  return (dispatch) => {
    dispatch({ type: "CREATE_CATEGORY_PENDING" });
    axios
      .post(
        `${Config.apiUrl}/categories`,
        categories,

        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )

      .then((res) => {
        dispatch({
          type: "CREATE_CATEGORY_SUCCESS",
        });
        dispatch(fetchAllCategories());
        toast.success("successfully Created New Category!!");
        setModal(false);
      })

      .catch((error) => {
        dispatch({
          type: "CREATE_CATEGORY_FAILURE",
          message: error.message,
        });

        errorHandel(error);
      });
  };
};

export const deleteCategory = (id) => {
  return (dispatch) => {
    dispatch({ type: "DELETE_CATEGORY_PENDING" });
    axios
      .delete(`${Config.apiUrl}/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })

      .then((res) => {
        dispatch({
          type: "DELETE_CATEGORY_SUCCESS",
        });
        dispatch(fetchAllCategories());
        toast.success("Record Deleted Successfully!!");
      })

      .catch((error) => {
        dispatch({
          type: "DELETE_CATEGORY_FAILURE",
          message: error.message,
        });
      });
  };
};

export const editCategory = (categories, id, setModal) => {
  return (dispatch) => {
    dispatch({ type: "EDIT_CATEGORY_PENDING" });
    axios
      .put(
        `${Config.apiUrl}/categories/${id}`,
        categories,

        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )

      .then((res) => {
        dispatch({
          type: "EDIT_CATEGORY_SUCCESS",
          editcategory: res.data,
        });
        setModal(false);
        dispatch(fetchAllCategories());
        toast.success(" Category successfully Updated!!");
      })

      .catch((error) => {
        dispatch({
          type: "EDIT_CATEGORY_FAILURE",
          message: error.message,
        });
        errorHandel(error);
      });
  };
};
