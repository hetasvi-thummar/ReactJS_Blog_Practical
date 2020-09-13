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
        toast.success("Record Deleted Successfully!!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })

      .catch((error) => {
        dispatch({
          type: "DELETE_CATEGORY_FAILURE",
          message: error.message,
        });
        error.response.data.message.map((error) =>
          error.messages.map((item) =>
            toast.error(item.message, {
              position: toast.POSITION.TOP_CENTER,
            })
          )
        );
      });
  };
};
