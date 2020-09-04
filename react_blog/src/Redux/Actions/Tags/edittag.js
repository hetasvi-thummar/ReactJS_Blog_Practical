import axios from "axios";
import { toast } from "react-toastify";
// import { fetchPaste } from "./fetchpaste";
import { fetchAllTags } from "./alltags";

export const editTag = (title, slug, description, id, setModal) => {
  const jwt = localStorage.getItem("jwt");

  return (dispatch) => {
    dispatch({ type: "EDIT_TAG_PENDING" });
    axios
      .put(
        `https://infblogdemo.herokuapp.com/tags/${id}`,
        {
          title,
          slug,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )

      .then((res) => {
        dispatch({
          type: "EDIT_TAG_SUCCESS",
          edittag: res.data,
        });
        setModal(false);
        dispatch(fetchAllTags());
        toast.success("successfully Updated!!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })

      .catch((error) => {
        dispatch({
          type: "EDIT_TAG_FAILURE",
          message: error.message,
        });
        toast.error(error.response.data, error, {
          position: toast.POSITION.TOP_CENTER,
        });
        setModal(true);
      });
  };
};
