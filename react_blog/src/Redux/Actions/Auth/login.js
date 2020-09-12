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
        localStorage.setItem("username", res.data.user.username);
        localStorage.setItem("userid", res.data.user.id);

        dispatch({
          type: "LOGIN_DATA_SUCCESS",
        });

        toast.success("successfully login", {
          position: toast.POSITION.TOP_CENTER,
        });

        history.push("/");
        console.log(res.data);
      })

      .catch((error) => {
        dispatch({
          type: "LOGIN_DATA_FAILURE",
          message: error.message,
        });

        error.response.data.message.map((error) =>
          error.messages.map((item) =>
            toast.error(item.message, {
              position: toast.POSITION.TOP_CENTER,
            })
          )
        );

        console.log(error.response.data.message);
      });
  };
};
