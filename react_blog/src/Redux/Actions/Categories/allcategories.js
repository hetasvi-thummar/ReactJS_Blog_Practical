import axios from "axios";

export const fetchAllCategories = () => {
  const jwt = localStorage.getItem("jwt");

  return (dispatch) => {
    dispatch({ type: "ALL_CATEGORIES_PENDING" });
    axios
      .get("https://infblogdemo.herokuapp.com/categories", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })

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
