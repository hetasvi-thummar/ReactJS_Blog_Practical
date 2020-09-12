import axios from "axios";

export const fetchAllTags = () => {
  // const jwt = localStorage.getItem("jwt");

  return (dispatch) => {
    dispatch({ type: "ALL_TAGS_PENDING" });
    axios
      .get("https://infblogdemo.herokuapp.com/tags")

      .then((res) => {
        dispatch({
          type: "ALL_TAGS_SUCCESS",
          alltags: res.data,
        });
      })

      .catch((error) => {
        dispatch({
          type: "ALL_TAGS_FAILURE",
        });
      });
  };
};

export const fetchSingleTag = (id) => {
  const jwt = localStorage.getItem("jwt");

  return (dispatch) => {
    dispatch({ type: "SINGLE_TAG_PENDING" });
    axios
      .get(`https://infblogdemo.herokuapp.com/tags/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })

      .then((res) => {
        dispatch({
          type: "SINGLE_TAG_SUCCESS",
          singletag: res.data,
        });
      })

      .catch((error) => {
        dispatch({
          type: "SINGLE_TAG_FAILURE",
        });
      });
  };
};
