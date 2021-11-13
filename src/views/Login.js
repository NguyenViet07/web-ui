import React from "react";
import ValidateMessage from "../components/validate-message";
import { Controller, useForm } from "react-hook-form";
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  Input,
  CardImg,
  FormGroup,
  Label,
  Button,
} from "reactstrap";
import { useMutation } from "react-fetching-library";
import { loginAction } from "../api/actions/login";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Group } from "../components/form-group/form-group";
import InputController from "../components/input-controller/input-controller";
import { useDispatch } from "react-redux";

const defaultValueSearch = {
  username: null,
  password: null,
};

const Login = () => {
  const { mutate: _loginAction } = useMutation(loginAction);

  const history = useHistory();

  const dispatch = useDispatch();

  const signInSchema = yup.object().shape({
    username: yup.string().required("Vui lòng nhập tên đăng nhập").nullable(),
    password: yup.string().required("Vui lòng nhập mật khẩu").nullable(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    reValidateMode: "onChange",
    defaultValues: defaultValueSearch,
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (data) => {
    const response = await _loginAction(data);
    if (response.status === 200 && response.payload?.errorCode === "200") {
      localStorage.setItem("token", response.payload.data.token);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          user: response.payload.data.userInfo,
          role: response.payload.data.roleName,
        })
      );
      const action = {
        type: "USER_NAME",
        data: response.payload.data.userInfo.userName,
      };
      dispatch(action);
      history.push(`/`);
    } else {
      toast.error(response.payload?.message);
    }
  };

  return (
    <div className="login">
      <div class="container-login ">
        <h1>Đăng nhập</h1>
        <h3>Hello</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputController control={control} name="username" type="text" />
          <ValidateMessage
            message={errors && errors.username ? errors.username.message : ""}
          />
          <InputController control={control} name="password" type="password" />
          <ValidateMessage
            message={errors && errors.password ? errors.password.message : ""}
          />
          <div className="d-flex justify-content-center mb-5">
            <Button className="signIn" type="submit">
              Đăng nhập
            </Button>
          </div>
        </Form>
        <div className="create">
          <a href="/create">Bạn chưa có tài khoản?</a>
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default Login;
