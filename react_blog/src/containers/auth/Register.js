import React from "react";
import { Container, Form, FormGroup, Input, Button } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import { FaUserAlt, FaUnlockAlt, FaEnvelope } from "react-icons/fa";
import { registerData } from "../../redux/actions/AuthActions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const signupSchema = yup.object().shape({
  username: yup.string().required("*Username is Required"),
  email: yup.string().required("*Email is required"),
  password: yup.string().required("*Password is Required"),
});

const Register = () => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const dispatch = useDispatch();

  const history = useHistory();

  const onSubmit = (registerdata) => {
    dispatch(registerData(registerdata, history));
  };

  return (
    <Container className=" loginform-container img" fluid={true}>
      <Form onSubmit={handleSubmit(onSubmit)} className="loginbox login-form  ">
        <FormGroup>
          <h5 className="register-title">Create Your Account</h5>
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
            className="login-form-control"
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
            className="login-form-control"
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
            className="login-form-control"
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
      </Form>
    </Container>
  );
};
export default Register;
