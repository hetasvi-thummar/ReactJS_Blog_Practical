import axios from "axios";
import { toast } from "react-toastify";
// import { fetchPaste } from "./fetchpaste";

import { fetchAllCategories } from "./allcategories";

export const editCategory = (title, slug, id, setModal) => {
  const jwt = localStorage.getItem("jwt");

  return (dispatch) => {
    dispatch({ type: "EDIT_CATEGORY_PENDING" });
    axios
      .put(
        `https://infblogdemo.herokuapp.com/categories/${id}`,
        {
          title,
          slug,
        },
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
        toast.error(error.response.data, error, {
          position: toast.POSITION.TOP_CENTER,
        });
        setModal(true);
      });
  };
};
