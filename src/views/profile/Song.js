import React, { useEffect, useState } from "react";
import {
  Row,
  Container,
  Col,
  CardImg,
  Form,
  Label,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useMutation } from "react-fetching-library";
import {
  addSongToAlbum,
  createSong,
  getListSongByUserId,
} from "../../api/actions/song";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Group } from "../../components/form-group/form-group";
import InputController from "../../components/input-controller/input-controller";
import ValidateMessage from "../../components/validate-message";
import { useDispatch, useSelector } from "react-redux";
import { listStyleSong, listTypeSong } from "../../untility/mock";
import SelectBox from "../../components/select-box/select-box";
import { getListMyAlbum } from "../../api/actions/album";

const defaultValueSearch = {
  songName: null,
  description: null,
  dataFile: null,
  imgSong: null,
  style: null,
  type: null,
};

const Song = ({}) => {
  const { mutate: _createSong } = useMutation(createSong);

  const { mutate: _addSongToAlbum } = useMutation(addSongToAlbum);

  const { mutate: _getListSongByUserId } = useMutation(getListSongByUserId);

  const { mutate: _getListMyAlbum } = useMutation(getListMyAlbum);

  const [modal, setModal] = useState(false);

  const [songIdAddAlbum, setSongIdAddAlbum] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const [listMySong, setListMySong] = useState([]);

  const [imageSong, setImageSong] = useState(null);

  const [listMyAlbum, setListMyAlbum] = useState([]);

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

  const history = useHistory();

  const dispatch = useDispatch();

  const listerToMusic = (songValue) => {
    const action = {
      type: "SONG_VALUE",
      data: songValue,
    };
    dispatch(action);
  };

  const getListMyAlbumView = async () => {
    let res = [];
    const response = await _getListMyAlbum({});
    if (response.payload?.errorCode === "200") {
      const options = response.payload?.data?.map((el) => ({
        value: el.albumId,
        label: el.albumName,
      }));
      res = options;
      setListMyAlbum(options);
    } else {
      toast.error(response.payload?.message);
    }
    return res;
  };

  const getListMySong = async () => {
    const response = await _getListSongByUserId({});
    if (response.payload?.errorCode === "200") {
      setListMySong(response.payload?.data?.content);
    } else {
      setListMySong([]);
    }
  };

  async function onFileChange(files) {
    if (files?.length === 0) {
      setValue("imgSong", null);
      setImageSong(null);
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
      setValue("imgSong", null);
      setImageSong(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const logoUpload = reader.result;
      // setValue('logo', logoUpload.split(',')[1])
      setImageSong(logoUpload);
    };
    reader.readAsDataURL(file);
  }

  const onSubmit = async (data) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const imageUpload = reader?.result;
      const formData = new FormData();
      formData.append("dataSongValue", data.dataFile[0]);
      formData.append("songName", data.songName);
      formData.append("description", data.description);
      formData.append("style", data.style);
      formData.append("type", data.type);
      formData.append("image", imageUpload);
      const response = await _createSong(formData);
      if (response.payload?.errorCode === "200") {
        toggle();
        getListMySong();
        toast.success("Tạo bài hát thành công");
      } else {
        toast.error(response.payload?.message);
      }
    };
    reader.readAsDataURL(data.imgSong ? data.imgSong[0] : null);
  };

  const onSubmitAlbum = async (data) => {
    const dataInput = {
      songId: songIdAddAlbum,
      albumId: data.albumId,
    };

    const response = await _addSongToAlbum(dataInput);
    if (response.payload?.errorCode === "200") {
      setIsOpen(!isOpen);
      getListMySong();
      toast.success("Thêm bài hát thành công");
    } else {
      toast.error(response.payload?.message);
    }
  };

  const toggle = async () => {
    setModal(!modal);
  };

  const toggleSelect = async (id) => {
    setSongIdAddAlbum(id);
    console.log("id", id);
    setIsOpen(!isOpen);
    getListMyAlbumView();
  };

  useEffect(() => {
    getListMySong();
  }, []);

  return (
    <>
      <Container className="profile-info mt-4">
        <Row>
          <div style={{ marginBottom: "10px" }}>
            <Col className="d-flex justify-content-between mb-5">
              <h1>Danh sách bài hát</h1>
              <Button onClick={toggle} className="add">
                Tạo bài hát mới
              </Button>
            </Col>
          </div>
          {listMySong.map((el) => {
            return (
              <Col md={3} className="mb-3">
                <Card
                  onClick={() => {
                    listerToMusic(el);
                  }}
                >
                  {el.image ? (
                    <CardImg
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      variant="top"
                      src={el.image}
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
                  <CardBody className="">
                    <div>
                      <span style={{ fontSize: "20px" }}>{el.songName}</span>
                    </div>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                      {el?.createdTime}
                    </CardSubtitle>
                    <CardText>{el.description}</CardText>
                    <Button
                      className="add"
                      onClick={() => {
                        toggleSelect(el.songId);
                      }}
                    >
                      Thêm vào album
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      <Modal
        size="lg"
        isOpen={isOpen}
        style={{ maxWidth: "1600px", width: "80%" }}
        centered={true}
      >
        <ModalHeader toggle={toggleSelect}>Thêm bài hát vào album</ModalHeader>
        <Form
          onSubmit={handleSubmit(onSubmitAlbum)}
          encType="multipart/form-data"
        >
          <ModalBody>
            <Row>
              <Col>
                <Group
                  className="mb-3"
                  controlId="formBasicEmail"
                  style={{ paddingTop: "5px" }}
                >
                  <Label>Danh sách album</Label>
                  <SelectBox
                    name="albumId"
                    valueOpt="value"
                    labelOpt="label"
                    control={control}
                    options={listMyAlbum}
                    placeholder={""}
                  />
                </Group>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button variant="primary" type="submit">
              Đăng ký
            </Button>
            <Button color="secondary" onClick={toggleSelect}>
              Đóng
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      <Modal
        size="lg"
        isOpen={modal}
        style={{ maxWidth: "1600px", width: "80%" }}
        centered={true}
      >
        <ModalHeader toggle={toggle}>Tải bài hát mới</ModalHeader>
        <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <ModalBody>
            <Row>
              <Col md={6}>
                <Group className="mb-3" style={{ paddingTop: "5px" }}>
                  <Label>Tên bài hát</Label>
                  <InputController
                    control={control}
                    name="songName"
                    type="text"
                  />
                  <ValidateMessage
                    message={errors && errors.name ? errors.name.message : ""}
                  />
                </Group>
                <Group
                  className="mb-3"
                  controlId="formBasicEmail"
                  style={{ paddingTop: "5px" }}
                >
                  <Label>Mô tả</Label>
                  <InputController
                    control={control}
                    name="description"
                    type="text"
                  />
                </Group>
                <Group
                  className="mb-3"
                  controlId="formBasicEmail"
                  style={{ paddingTop: "5px" }}
                >
                  <Label>Thể loại nhạc</Label>
                  <SelectBox
                    name="type"
                    valueOpt="value"
                    labelOpt="label"
                    control={control}
                    options={listStyleSong}
                    placeholder={""}
                  />
                </Group>
                <Group
                  className="mb-3"
                  controlId="exampleSelect"
                  style={{ paddingTop: "5px" }}
                >
                  <Label>Quốc gia</Label>
                  <SelectBox
                    name="type"
                    valueOpt="value"
                    labelOpt="label"
                    control={control}
                    options={listTypeSong}
                    placeholder={""}
                  />
                </Group>
                <Group
                  className="mb-3"
                  controlId="exampleSelect"
                  style={{ paddingTop: "5px" }}
                >
                  <Label>Ảnh bài hát</Label>
                  <input
                    id="logo"
                    accept=".png, .jpg, .jpeg"
                    {...register("imgSong")}
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
                  <Label style={{ marginRight: "10px" }}>File nhạc</Label>
                  <input {...register("dataFile")} accept=".mp3" type="file" />
                </Group>
              </Col>
              <Col md={6}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {imageSong ? (
                    <CardImg
                      style={{
                        width: "300px",
                        height: "300px",
                        objectFit: "cover",
                      }}
                      variant="top"
                      src={imageSong}
                    />
                  ) : (
                    <CardImg
                      style={{
                        width: "300px",
                        height: "300px",
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
              Đăng ký
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default Song;
