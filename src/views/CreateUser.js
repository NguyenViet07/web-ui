import React, { useState } from "react";
import ValidateMessage from "../components/validate-message";
import { useForm } from "react-hook-form";
import { creatUser } from "../api/actions/users";
import { useMutation } from "react-fetching-library";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputController from "../components/input-controller/input-controller";
import {
  Card,
  CardImg,
  Form,
  Button,
  CardBody,
  CardTitle,
  Label,
} from "reactstrap";
import { Group } from "../components/form-group/form-group";

const defaultValueSearch = {
  name: null,
  username: null,
  password: null,
  passwordConfirm: null,
  isSinger: false,
  company: null,
  identityCard: null,
  logo: null,
};

const CreateUser = () => {
  const { mutate: _creatUser } = useMutation(creatUser);

  const [logo, setLogo] = useState(null);

  const history = useHistory();

  const [checkSinger, setCheckSinger] = useState(false);

  const signInSchema = yup.object().shape({
    username: yup.string().required("Vui lòng nhập tên đăng nhập").nullable(),
    password: yup.string().required("Vui lòng nhập mật khẩu").nullable(),
    passwordConfirm: yup
      .string()
      .required("Vui lòng xác nhận mật khẩu")
      .nullable(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    register,
    setValue,
  } = useForm({
    reValidateMode: "onChange",
    defaultValues: defaultValueSearch,
    resolver: yupResolver(signInSchema),
  });

  // const checkSinger = watch('isSinger')

  async function onFileChange(files) {
    if (files?.length === 0) {
      setValue("logo", null);
      setLogo(null);
      return;
    }
    const file = files[0];
    let isValid = true;
    if (
      file?.type.split("/")[1] !== "png" &&
      file?.type.split("/")[1] !== "jpeg" &&
      file?.type.split("/")[1] !== "jpg"
    ) {
      isValid = false;
    } else if (file.size > 1024 * 1024 /* 1MB */) {
      isValid = false;
    } else {
      isValid = true;
    }
    if (!isValid) {
      toast.error(
        "Vui lòng chọn file kích thước nhỏ hơn 1Mb định dạng: png, jpg, jpeg"
      );
      const input = document.getElementById("logo");
      const dataTransfer = new DataTransfer();
      input.files = dataTransfer.files;
      setValue("logo", null);
      setLogo(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const logoUpload = reader.result;
      console.log(logoUpload);
      // setValue('logo', logoUpload.split(',')[1])
      setLogo(logoUpload);
    };
    reader.readAsDataURL(file);
  }

  const onSubmit = (data) => {
    console.log("data", data);
    if (data.password !== data.passwordConfirm) {
      toast.error("Xác nhận lại mật khẩu");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const logoUpload = reader?.result;
      const dataInput = {
        company: data.company,
        identityCard: data.identityCard,
        isSinger: data.isSinger ? 1 : 0,
        name: data.name,
        password: data.password,
        username: data.username,
        image: logoUpload,
      };
      const response = await _creatUser(dataInput);
      if (response.payload?.errorCode === "200") {
        history.push(`/`);
      } else {
        toast.error(response.payload?.message);
      }
    };
    reader.readAsDataURL(data.logo ? data.logo[0] : null);
  };

  return (
    <>
      <Card
        border="danger"
        style={{ width: "50%", margin: "auto", marginTop: "20px" }}
      >
        <CardTitle>
          <h1 style={{ textAlign: "center", marginTop: "20px" }}>Đăng ký</h1>
        </CardTitle>
        <CardBody>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {logo ? (
              <CardImg
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "100px",
                }}
                variant="top"
                src={logo}
              />
            ) : (
              <CardImg
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "100px",
                }}
                variant="top"
                src="/imgs/logo.png"
              />
            )}
          </div>
          <Form>
            <Group
              className="mb-3"
              controlId="formBasicEmail"
              style={{ paddingTop: "5px" }}
            >
              <Label>Họ và tên đầy đủ</Label>
              <InputController control={control} name="name" type="text" />
              <ValidateMessage
                message={errors && errors.name ? errors.name.message : ""}
              />
            </Group>

            <Group
              className="mb-3"
              controlId="formBasicEmail"
              style={{ paddingTop: "5px" }}
            >
              <Label>Ảnh đại diện</Label>
              <input
                id="logo"
                accept=".png, .jpg, .jpeg"
                {...register("logo")}
                type="file"
                onChange={({ target: { files } }) => {
                  onFileChange(files);
                }}
              />
            </Group>

            <Group
              className="mb-3"
              controlId="formBasicEmail"
              style={{ paddingTop: "5px" }}
            >
              <Label>Tên đăng nhập</Label>
              <InputController control={control} name="username" type="text" />
              <ValidateMessage
                message={
                  errors && errors.username ? errors.username.message : ""
                }
              />
            </Group>
            <Group
              className="mb-3"
              controlId="formBasicPassword"
              style={{ paddingTop: "5px" }}
            >
              <Label>Mật khẩu</Label>
              <InputController
                control={control}
                name="password"
                type="password"
              />
              <ValidateMessage
                message={
                  errors && errors.password ? errors.password.message : ""
                }
              />
            </Group>
            <Group
              className="mb-3"
              controlId="formBasicPassword"
              style={{ paddingTop: "5px" }}
            >
              <Label>Xác nhận lại mật khẩu</Label>
              <InputController
                control={control}
                name="passwordConfirm"
                type="password"
              />
              <ValidateMessage
                message={
                  errors && errors.passwordConfirm
                    ? errors.passwordConfirm.message
                    : ""
                }
              />
            </Group>
            <Group
              className="mb-3"
              controlId="formBasicPassword"
              style={{ paddingTop: "5px" }}
            >
              <Label>Ca sĩ</Label>
              <InputController
                control={control}
                name="isSinger"
                type="checkbox"
                onChange={(val) => {
                  setCheckSinger(val.target.checked);
                }}
              />
            </Group>
            {checkSinger && (
              <>
                <Group
                  className="mb-3"
                  controlId="formBasicPassword"
                  style={{ paddingTop: "5px" }}
                >
                  <Label>Công ty hoặc đại diên</Label>
                  <InputController
                    control={control}
                    name="company"
                    type="text"
                  />
                  <ValidateMessage
                    message={
                      errors && errors.company ? errors.company.message : ""
                    }
                  />
                </Group>
                <Group
                  className="mb-3"
                  controlId="formBasicPassword"
                  style={{ paddingTop: "5px" }}
                >
                  <Label>Chứng minh thư / hộ chiếu người đại diện</Label>
                  <InputController
                    control={control}
                    name="identityCard"
                    type="text"
                  />
                  <ValidateMessage
                    message={
                      errors && errors.identityCard
                        ? errors.identityCard.message
                        : ""
                    }
                  />
                </Group>
              </>
            )}

            <Button
              variant="primary"
              className="add"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Đăng ký
            </Button>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default CreateUser;
