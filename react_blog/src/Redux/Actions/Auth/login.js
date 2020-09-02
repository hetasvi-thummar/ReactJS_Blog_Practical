import axios from "axios";
import { toast } from "react-toastify";

export const loginData = (identifier, password, history) => {
  return (dispatch) => {
    dispatch({ type: "LOGIN_DATA_PENDING" });
    axios
      .post("https://infblogdemo.herokuapp.com/auth/local", {
        identifier: identifier,
        password: password,
      })

      .then((res) => {
        localStorage.setItem("jwt", res.data.jwt);

        dispatch({
          type: "LOGIN_DATA_SUCCESS",
        });

        toast.success("successfully login", {
          position: toast.POSITION.TOP_CENTER,
        });

        history.push("/");
      })

      .catch((error) => {
        dispatch({
          type: "LOGIN_DATA_FAILURE",
        });
        toast.error("Invalid username or password", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
};
