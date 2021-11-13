import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  Form,
  ModalBody,
  Label,
  CardImg,
  ModalFooter,
  Button,
} from "reactstrap";
import "../../styles/info.css";
import { Group } from "../../components/form-group/form-group";
import InputController from "../../components/input-controller/input-controller";
import ValidateMessage from "../../components/validate-message";
import { useMutation } from "react-fetching-library";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createPlaylist, getListMyPlaylist } from "../../api/actions/playlist";
import MusicItem from "./MusicItem";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const defaultValueSearch = {
  namePlaylist: null,
  imgPlaylist: null,
};

const Playlist = ({}) => {
  const { mutate: _createPlaylist } = useMutation(createPlaylist);
  const { mutate: _getListMyPlaylist } = useMutation(getListMyPlaylist);

  const [modal, setModal] = useState(false);

  const [imagePlaylist, setImagePlaylist] = useState(null);
  const [listMyPlaylist, setListMyPlaylist] = useState(null);

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

  const dispatch = useDispatch();

  const history = useHistory();

  async function onFileChange(files) {
    if (files?.length === 0) {
      setValue("imgPlaylist", null);
      setImagePlaylist(null);
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
      setValue("imgPlaylist", null);
      setImagePlaylist(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const logoUpload = reader.result;
      // setValue('logo', logoUpload.split(',')[1])
      setImagePlaylist(logoUpload);
    };
    reader.readAsDataURL(file);
  }

  const onSubmit = async (data) => {
    if (data.imgPlaylist?.length > 0) {
      const reader = new FileReader();
      reader.onload = async () => {
        const logoUpload = reader?.result;
        const dataInput = {
          namePlaylist: data.namePlaylist,
          image: logoUpload,
        };
        const response = await _createPlaylist(dataInput);
        if (response.payload?.errorCode === "200") {
          toggle();
        } else {
          toast.error(response.payload?.message);
        }
      };
      reader.readAsDataURL(data.imgPlaylist ? data.imgPlaylist[0] : null);
    } else {
      const dataInput = {
        namePlaylist: data.namePlaylist,
      };
      const response = await _createPlaylist(dataInput);
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
    const response = await _getListMyPlaylist({});
    if (response.payload?.errorCode === "200") {
      setListMyPlaylist(response.payload?.data);
    } else {
      toast.error(response.payload?.message);
    }
  }, []);

  return (
    <>
      <Container className="profile-info mt-4">
        <Col className="d-flex justify-content-between mb-5">
          <h1>Playlist</h1>
          <Button onClick={toggle} className="add">
            Tạo playlist mới
          </Button>
        </Col>
        <Row>
          {listMyPlaylist?.map((el) => {
            return (
              <Col
                className="mb-3"
                xs="3"
                onClick={() => {
                  history.push(`/page-playlist-song/${el.playlistId}`);
                }}
              >
                <div
                  className="border add-playlist d-flex p-3"
                  style={{
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
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                        objectFit: "cover",
                      }}
                      src={el.image}
                      alt="Card image cap"
                    />
                  ) : (
                    <CardImg
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                        objectFit: "cover",
                      }}
                      src="/imgs/image.jpg"
                      alt="Card image cap"
                    />
                  )}
                  <h6 className="title">{el.namePlaylist}</h6>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>

      <Modal size="md" isOpen={modal} centered={true}>
        <ModalHeader toggle={toggle}>Tạo Playlist mới</ModalHeader>
        <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <ModalBody>
            <Row>
              <Col md={12}>
                <Group className="mb-3" style={{ paddingTop: "5px" }}>
                  <Label>Tên Playlist</Label>
                  <InputController
                    control={control}
                    name="namePlaylist"
                    type="text"
                  />
                  <ValidateMessage
                    message={
                      errors && errors.namePlaylist
                        ? errors.namePlaylist.message
                        : ""
                    }
                  />
                </Group>
                <div class="button-wrapper">
                  <span class="label">Chọn ảnh</span>
                  <input
                    className="upload-box"
                    id={"imgPlaylist"}
                    accept=".png, .jpg, .jpeg"
                    {...register("imgPlaylist")}
                    type="file"
                    onChange={({ target: { files } }) => {
                      onFileChange(files);
                    }}
                  />
                </div>
                <Group
                  className="mb-3"
                  controlId="exampleSelect"
                  style={{ paddingTop: "5px" }}
                >
                  <Label>Hình ảnh minh họa</Label>
                  <input
                    id={"imgPlaylist"}
                    accept=".png, .jpg, .jpeg"
                    {...register("imgPlaylist")}
                    type="file"
                    onChange={({ target: { files } }) => {
                      onFileChange(files);
                    }}
                  />
                </Group>
              </Col>
              <Col md={12}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {imagePlaylist ? (
                    <CardImg
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      variant="top"
                      src={imagePlaylist}
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
            <Button color="secondary" className="off" onClick={toggle}>
              Đóng
            </Button>
            <Button variant="primary" className="add" type="submit">
              Tạo
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default Playlist;
