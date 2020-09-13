import axios from "axios";
import { toast } from "react-toastify";

export const registerData = (registerdata, history) => {
  return (dispatch) => {
    dispatch({ type: "REGISTER_DATA_PENDING" });
    axios
      .post(
        "https://infblogdemo.herokuapp.com/auth/local/register",
        registerdata
      )

      .then((res) => {
        dispatch({
          type: "REGISTER_DATA_SUCCESS",
        });

        toast.success("successfully register", {
          position: toast.POSITION.TOP_CENTER,
        });
        history.push("/login");
      })

      .catch((error) => {
        dispatch({
          type: "REGISTER_DATA_FAILURE",
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
