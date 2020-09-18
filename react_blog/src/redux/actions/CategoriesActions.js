import axios from "axios";
import { toast } from "react-toastify";

export const fetchAllCategories = () => {
  return (dispatch) => {
    dispatch({ type: "ALL_CATEGORIES_PENDING" });
    axios
      .get("https://infblogdemo.herokuapp.com/categories")

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
  const jwt = localStorage.getItem("jwt");

  return (dispatch) => {
    dispatch({ type: "SINGLE_CATEGORY_PENDING" });
    axios
      .get(`https://infblogdemo.herokuapp.com/categories/${id}`, {
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
  const jwt = localStorage.getItem("jwt");

  return (dispatch) => {
    dispatch({ type: "CREATE_CATEGORY_PENDING" });
    axios
      .post(
        "https://infblogdemo.herokuapp.com/categories",
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
        toast.success("successfully Created New Category!!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setModal(false);
      })

      .catch((error) => {
        dispatch({
          type: "CREATE_CATEGORY_FAILURE",
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

export const deleteCategory = (id) => {
  const jwt = localStorage.getItem("jwt");
  return (dispatch) => {
    dispatch({ type: "DELETE_CATEGORY_PENDING" });
    axios
      .delete(`https://infblogdemo.herokuapp.com/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })

      .then((res) => {
        dispatch({
          type: "DELETE_CATEGORY_SUCCESS",
        });
        dispatch(fetchAllCategories());
        toast.success("Record Deleted Successfully!!", {
          position: toast.POSITION.TOP_CENTER,
        });
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
  const jwt = localStorage.getItem("jwt");

  return (dispatch) => {
    dispatch({ type: "EDIT_CATEGORY_PENDING" });
    axios
      .put(
        `https://infblogdemo.herokuapp.com/categories/${id}`,
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
        toast.success(" Category successfully Updated!!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })

      .catch((error) => {
        dispatch({
          type: "EDIT_CATEGORY_FAILURE",
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
