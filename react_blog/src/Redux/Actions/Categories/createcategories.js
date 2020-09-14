import axios from "axios";
import { toast } from "react-toastify";
import { fetchAllCategories } from "./allcategories";

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
