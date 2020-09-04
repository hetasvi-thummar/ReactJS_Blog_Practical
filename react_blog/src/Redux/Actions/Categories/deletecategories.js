import axios from "axios";
import { toast } from "react-toastify";

import { fetchAllCategories } from "./allcategories";

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

        // toast.success("successfully deleted", {
        //   position: toast.POSITION.TOP_CENTER,
        // });
      })

      .catch((error) => {
        dispatch({
          type: "DELETE_CATEGORY_FAILURE",
          message: error.message,
        });
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
};
