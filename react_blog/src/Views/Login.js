import React from "react";
import { Container, Form, FormGroup, Input, Button } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import { Link } from "@reach/router";
import { FaUserAlt, FaUnlockAlt } from "react-icons/fa";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginData } from "../Redux/Actions/Auth/login";

const formSchema = yup.object().shape({
  identifier: yup.string().required("*Username is Required"),
  password: yup.string().required("*Password is Required"),
});

const Login = () => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(formSchema),
  });

  const dispatch = useDispatch();

  const history = useHistory();

  const onsubmit = (data) => {
    dispatch(loginData(data.identifier, data.password, history));
  };
  const token = localStorage.getItem("jwt");

  return (
    <Container className=" loginform-container img" fluid={true}>
      <Form onSubmit={handleSubmit(onsubmit)} className="loginbox login-form  ">
        <FormGroup>
          <h2>Login</h2>
          <p>Enter your details below to continue</p>
        </FormGroup>
        <FormGroup>
          <Controller
            as={Input}
            type="text"
            name="identifier"
            defaultValue=""
            placeholder="Username"
            control={control}
            ref={register}
          />
          <FaUserAlt className="loginform-logo" />

          {errors && errors.identifier && (
            <span className="text-danger">{errors.identifier.message}</span>
          )}
        </FormGroup>
        <FormGroup>
          <Controller
            as={Input}
            type="password"
            name="password"
            defaultValue=""
            placeholder="Password"
            control={control}
            ref={register}
          />
          <FaUnlockAlt className="loginform-logo" />

          {errors && errors.password && (
            <span className="text-danger">{errors.password.message}</span>
          )}
        </FormGroup>
        <FormGroup className="text-center">
          <Button color="primary" className="signin-btn">
            Sign In
          </Button>
        </FormGroup>
        <FormGroup>
          <p>
            Don 't have an account?
            <Link to="/register" className="pl-2">
              Sign up
            </Link>
          </p>
        </FormGroup>
      </Form>
    </Container>
  );
};
export default Login;
