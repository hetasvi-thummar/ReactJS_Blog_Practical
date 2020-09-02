import axios from "axios";
import { toast } from "react-toastify";

export const registerData = (username, email, password) => {
  return (dispatch) => {
    dispatch({ type: "REGISTER_DATA_PENDING" });
    axios
      .post("https://infblogdemo.herokuapp.com/auth/local/register", {
        username: username,
        email: email,
        password: password,
      })

      .then((res) => {
        dispatch({
          type: "REGISTER_DATA_SUCCESS",
        });

        toast.success("successfully register", {
          position: toast.POSITION.TOP_CENTER,
        });
      })

      .catch((error) => {
        dispatch({
          type: "REGISTER_DATA_FAILURE",
        });
        toast.error("registration failed", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
};
