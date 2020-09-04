import axios from "axios";
import { toast } from "react-toastify";
import { fetchAllTags } from "./alltags";

export const createTag = (title, slug, description, setModal) => {
  const jwt = localStorage.getItem("jwt");

  return (dispatch) => {
    dispatch({ type: "CREATE_TAG_PENDING" });
    axios
      .post(
        "https://infblogdemo.herokuapp.com/tags",
        {
          title: title,
          slug: slug,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )

      .then((res) => {
        dispatch({
          type: "CREATE_TAG_SUCCESS",
        });
        dispatch(fetchAllTags());
        toast.success("successfully Created New Tag!!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setModal(false);
      })

      .catch((error) => {
        dispatch({
          type: "CREATE_TAG_FAILURE",
          message: error.message,
        });
        toast.error(error.response.data.error, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
};
