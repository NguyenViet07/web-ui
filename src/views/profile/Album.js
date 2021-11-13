import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Container,
  CardImg,
  Modal,
  ModalHeader,
  Form,
  ModalBody,
  Label,
  ModalFooter,
  Button,
} from "reactstrap";
import MusicItem from "./MusicItem";
import { Group } from "../../components/form-group/form-group";
import InputController from "../../components/input-controller/input-controller";
import ValidateMessage from "../../components/validate-message";
import SelectBox from "../../components/select-box/select-box";
import { listStyleSong, listTypeSong } from "../../untility/mock";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation } from "react-fetching-library";
import { createAlbum, getListMyAlbum } from "../../api/actions/album";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const defaultValueSearch = {
  albumName: null,
  imgAlbum: null,
};

const Album = ({}) => {
  const { mutate: _createAlbum } = useMutation(createAlbum);
  const { mutate: _getListMyAlbum } = useMutation(getListMyAlbum);

  const [modal, setModal] = useState(false);

  const [imageAlbum, setImageAlbum] = useState(null);

  const [listMyAlbum, setListMyAlbum] = useState(null);

  const dispatch = useDispatch();

  const history = useHistory();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    register,
  } = useForm({
    reValidateMode: "onChange",
    defaultValues: defaultValueSearch,
  });

  async function onFileChange(files) {
    if (files?.length === 0) {
      setValue("imgAlbum", null);
      setImageAlbum(null);
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
      const input = document.getElementById("imgAlbum");
      const dataTransfer = new DataTransfer();
      input.files = dataTransfer.files;
      setValue("imgAlbum", null);
      setImageAlbum(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const logoUpload = reader.result;
      // setValue('logo', logoUpload.split(',')[1])
      setImageAlbum(logoUpload);
    };
    reader.readAsDataURL(file);
  }

  const onSubmit = async (data) => {
    if (data.imgAlbum?.length > 0) {
      const reader = new FileReader();
      reader.onload = async () => {
        const logoUpload = reader?.result;
        const dataInput = {
          albumName: data.albumName,
          image: logoUpload,
        };
        const response = await _createAlbum(dataInput);
        if (response.payload?.errorCode === "200") {
          toggle();
        } else {
          toast.error(response.payload?.message);
        }
      };
      reader.readAsDataURL(data.imgAlbum[0]);
    } else {
      const dataInput = {
        albumName: data.albumName,
      };
      const response = await _createAlbum(dataInput);
      if (response.payload?.errorCode === "200") {
        toggle();
      } else {
        toast.error(response.payload?.message);
      }
    }
  };

  const toggle = async () => {
    setModal(!modal);
  };

  useEffect(async () => {
    const response = await _getListMyAlbum({});
    if (response.payload?.errorCode === "200") {
      console.log("aaa", response.payload.data);
      setListMyAlbum(response.payload?.data);
    } else {
      toast.error(response.payload?.message);
    }
  }, []);

  return (
    <>
      <Container className="profile-info mt-4">
        <Col className="d-flex justify-content-between mb-5">
          <h1>Album</h1>
          <Button onClick={toggle} className="add">
            Tạo Album mới
          </Button>
        </Col>
        <Row>
          {listMyAlbum?.map((el) => {
            return (
              <Col
                className=" mb-3"
                xs="3"
                onClick={() => {
                  history.push(`/page-list-song/${el.albumId}`);
                }}
              >
                <div
                  className="border add-playlist d-flex p-3"
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    margin: "0 auto",
                    position: "relative",
                  }}
                >
                  <button type="button" class="delete btn">
                    <span aria-hidden="true">×</span>
                  </button>
                  {el.image ? (
                    <CardImg
                      className="col-4"
                      style={{
                        maxWidth: "70px",
                        height: "70px",
                        objectFit: "cover",
                      }}
                      src={el.image}
                      alt="Card image cap"
                    />
                  ) : (
                    <CardImg
                      className="col-4"
                      style={{
                        maxWidth: "70px",
                        height: "70px",
                        objectFit: "cover",
                      }}
                      src="/imgs/pika.jpg"
                      alt="Card image cap"
                    />
                  )}
                  <h5 className="col-8 ml-3 title">{el.albumName}</h5>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>

      <Modal size="md" isOpen={modal} centered={true}>
        <ModalHeader toggle={toggle}>Tạo Album mới</ModalHeader>
        <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <ModalBody>
            <Row>
              <Col md={12}>
                <Group className="mb-3" style={{ paddingTop: "5px" }}>
                  <Label>Tên album</Label>
                  <InputController
                    control={control}
                    name="albumName"
                    type="text"
                  />
                  <ValidateMessage
                    message={
                      errors && errors.albumName ? errors.albumName.message : ""
                    }
                  />
                </Group>
                <div class="button-wrapper">
                  <span class="label">Chọn ảnh</span>
                  <input
                    className="upload-box"
                    id={"imgAlbum"}
                    accept=".png, .jpg, .jpeg"
                    {...register("imgAlbum")}
                    type="file"
                    onChange={({ target: { files } }) => {
                      onFileChange(files);
                    }}
                  />
                </div>
                {/* <Group
                  className="mb-3"
                  controlId="exampleSelect"
                  style={{ paddingTop: "5px" }}
                >
                  <Label>Hình ảnh minh họa</Label>
                  <input
                    id={"imgAlbum"}
                    accept=".png, .jpg, .jpeg"
                    {...register("imgAlbum")}
                    type="file"
                    onChange={({ target: { files } }) => {
                      onFileChange(files);
                    }}
                  />
                </Group> */}
              </Col>
              <Col md={12}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {imageAlbum ? (
                    <CardImg
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      variant="top"
                      src={imageAlbum}
                    />
                  ) : (
                    <CardImg
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      variant="top"
                      src="/imgs/pika.jpg"
                    />
                  )}
                </div>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Đóng
            </Button>
            <Button variant="primary" type="submit">
              Tạo
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default Album;
