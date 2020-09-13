import axios from "axios";
import { toast } from "react-toastify";
import { fetchAllTags } from "./alltags";

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
