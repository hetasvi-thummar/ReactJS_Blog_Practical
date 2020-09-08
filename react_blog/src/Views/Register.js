import React from "react";
import { Container, Form, FormGroup, Input, Button } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import { Link } from "@reach/router";
import { FaUserAlt, FaUnlockAlt, FaEnvelope } from "react-icons/fa";
import { registerData } from "../Redux/Actions/Auth/register";
import { useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

const formSchema = yup.object().shape({
  username: yup.string().required("*Username is Required"),
  email: yup.string().required("*Email is required"),
  password: yup.string().required("*Password is Required"),
});

const Register = () => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(formSchema),
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const onsubmit = (registerdata) => {
    dispatch(
      registerData(
        registerdata.username,
        registerdata.email,
        registerdata.password,
        history
      )
    );
  };

  return (
    <Container className=" loginform-container img" fluid={true}>
      <Form onSubmit={handleSubmit(onsubmit)} className="loginbox login-form  ">
        <FormGroup>
          <h5>Create Your Account</h5>
        </FormGroup>
        <FormGroup>
          <Controller
            as={Input}
            type="text"
            name="username"
            defaultValue=""
            placeholder="Username"
            control={control}
            ref={register}
          />
          <FaUserAlt className="loginform-logo" />

          {errors && errors.username && (
            <span className="text-danger">{errors.username.message}</span>
          )}
        </FormGroup>
        <FormGroup>
          <Controller
            as={Input}
            type="email"
            name="email"
            defaultValue=""
            placeholder="E-mail"
            control={control}
            ref={register}
          />
          <FaEnvelope className="loginform-logo" />

          {errors && errors.email && (
            <span className="text-danger">{errors.email.message}</span>
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
            Sign up
          </Button>
        </FormGroup>
        {/* <FormGroup>
          <p>
            Don 't have an account?
            <Link to="/Register" className="pr-4">
              Sign up
            </Link>
          </p>
        </FormGroup> */}
      </Form>
    </Container>
  );
};
export default Register;
