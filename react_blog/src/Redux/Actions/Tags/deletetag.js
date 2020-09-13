import axios from "axios";
import { toast } from "react-toastify";
import { fetchAllTags } from "./alltags";

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
