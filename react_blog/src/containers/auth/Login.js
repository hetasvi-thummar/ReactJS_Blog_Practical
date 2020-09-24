import React from "react";
import { Container, Form, FormGroup, Input, Button } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import { Link } from "react-router-dom";
import { FaUserAlt, FaUnlockAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginData } from "../../redux/actions/AuthActions";

const signinSchema = yup.object().shape({
  identifier: yup.string().required("*Username is Required"),
  password: yup.string().required("*Password is Required"),
});

const Login = () => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(signinSchema),
  });

  const dispatch = useDispatch();

  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(loginData(data, history));
  };

  return (
    <Container className=" loginform-container img" fluid={true}>
      <Form onSubmit={handleSubmit(onSubmit)} className="loginbox login-form  ">
        <FormGroup>
          <h2 className="login-title ">Login</h2>
          <p className="paragraph-text">Enter your details below to continue</p>
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
            className="login-form-control"
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
            className="login-form-control"
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
            <Link to="/register" className="pl-2" title="signup">
              Sign up
            </Link>
          </p>
        </FormGroup>
      </Form>
    </Container>
  );
};
export default Login;
