import axios from "axios";
import { toast } from "react-toastify";
import { Config } from "../../common";

export const loginData = (data, history) => {
  return (dispatch) => {
    dispatch({ type: "LOGIN_DATA_PENDING" });
    axios
      .post(`${Config.apiUrl}/auth/local`, data)

      .then((res) => {
        localStorage.setItem("jwt", res.data.jwt);
        localStorage.setItem("username", res.data.user.username);
        localStorage.setItem("userid", res.data.user.id);

        dispatch({
          type: "LOGIN_DATA_SUCCESS",
        });

        toast.success("successfully login");

        history.push("/");
      })

      .catch((error) => {
        dispatch({
          type: "LOGIN_DATA_FAILURE",
          message: error.message,
        });

        error.response.data.message.map((error) =>
          error.messages.map((item) => toast.error(item.message))
        );
      });
  };
};

export const registerData = (registerdata, history) => {
  return (dispatch) => {
    dispatch({ type: "REGISTER_DATA_PENDING" });
    axios
      .post(`${Config.apiUrl}/auth/local/register`, registerdata)

      .then((res) => {
        dispatch({
          type: "REGISTER_DATA_SUCCESS",
        });

        toast.success("successfully register");
        history.push("/login");
      })

      .catch((error) => {
        dispatch({
          type: "REGISTER_DATA_FAILURE",
          message: error.message,
        });
        error.response.data.message.map((error) =>
          error.messages.map((item) => toast.error(item.message))
        );
      });
  };
};
