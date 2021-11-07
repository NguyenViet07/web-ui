import React, {useEffect, useState} from "react";
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
    Button
} from "reactstrap";
import "../../styles/info.css";
import {Group} from "../../components/form-group/form-group";
import InputController from "../../components/input-controller/input-controller";
import ValidateMessage from "../../components/validate-message";
import {useMutation} from "react-fetching-library";
import {createAlbum} from "../../api/actions/album";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {createPlaylist} from "../../api/actions/playlist";

const defaultValueSearch = {
    namePlaylist: null,
    imgPlaylist: null
}

const Playlist = ({}) => {

    const {mutate: _createPlaylist} = useMutation(createPlaylist)

    const [modal, setModal] = useState(false)

    const [imagePlaylist, setImagePlaylist] = useState(null)

    const {control, handleSubmit, formState: {errors}, watch, setValue, register} = useForm({
        reValidateMode: "onChange",
        defaultValues: defaultValueSearch
    })

    async function onFileChange(files) {
        if (files?.length === 0) {
            setValue('imgPlaylist', null)
            setImagePlaylist(null)
            return
        }
        const file = files[0]
        let isValid = true
        if (file?.type.split('/')[1] !== 'png' && file?.type.split('/')[1] !== 'jpeg' && file?.type.split('/')[1] !== 'jpg') {
            isValid = false
        } else if (file.size > (1024 * 1024) /* 1MB */) {
            isValid = false
        } else {
            isValid = true
        }
        if (!isValid) {
            toast.error('Vui lòng chọn file kích thước nhỏ hơn 1Mb định dạng: png, jpg, jpeg')
            const input = document.getElementById('logo')
            const dataTransfer = new DataTransfer()
            input.files = dataTransfer.files
            setValue('imgPlaylist', null)
            setImagePlaylist(null)
            return
        }
        const reader = new FileReader()
        reader.onload = () => {
            const logoUpload = reader.result
            // setValue('logo', logoUpload.split(',')[1])
            setImagePlaylist(logoUpload)
        }
        reader.readAsDataURL(file)
    }

    const onSubmit = (data) => {

        const reader = new FileReader()
        reader.onload = async () => {
            const logoUpload = reader?.result
            const dataInput = {
                namePlaylist: data.albumName,
                image: logoUpload,
            }
            const response = await _createPlaylist(dataInput)
            if (response.payload?.errorCode === '200') {
                toggle()
            } else {
                toast.error(response.payload?.message)
            }
        }
        reader.readAsDataURL(data.imgPlaylist ? data.imgPlaylist[0] : null)
    };

    const toggle = async () => {
        setModal(!modal)
    }

    useEffect(() => {

    }, [])

    return (
      <>
        <Container>
          <h1>Playlist</h1>
            <Button onClick={toggle}>Tạo playlist mới</Button>
          <Row>
            <Col className="bg-light border add-playlist" xs="3">
              Add new playlist
            </Col>
          </Row>
        </Container>

          <Modal size="lg" isOpen={modal} style={{maxWidth: '1600px', width: '80%'}} centered={true}>
              <ModalHeader toggle={toggle}>Tạo Playlist mới</ModalHeader>
              <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                  <ModalBody>
                      <Row>
                          <Col md={6}>
                              <Group className="mb-3"  style={{paddingTop: '5px'}}>
                                  <Label>Tên album</Label>
                                  <InputController
                                      control={control}
                                      name="namePlaylist"
                                      type="text"
                                  />
                                  <ValidateMessage
                                      message={errors && errors.namePlaylist ? errors.namePlaylist.message : ''}/>
                              </Group>
                              <Group className="mb-3" controlId="exampleSelect" style={{paddingTop: '5px'}}>
                                  <Label>Hình ảnh minh họa</Label>
                                  <input
                                      accept=".png, .jpg, .jpeg"
                                      {...register("imgAlbum")}
                                      type="file"
                                      onChange={({target: {files}}) => {
                                          onFileChange(files)
                                      }}
                                  />
                              </Group>
                          </Col>
                          <Col md={6}>
                              <div style={{display: 'flex', justifyContent: 'center'}}>
                                  {
                                      imagePlaylist ? <CardImg
                                              style={{width: '300px', height: '300px', objectFit: 'cover'}}
                                              variant="top" src={imagePlaylist}/> :
                                          <CardImg
                                              style={{width: '300px', height: '300px', objectFit: 'cover'}}
                                              variant="top" src='/imgs/pika.jpg'/>
                                  }
                              </div>
                          </Col>
                      </Row>
                  </ModalBody>
                  <ModalFooter>
                      <Button color="secondary" onClick={toggle}>Đóng</Button>
                      <Button variant="primary" type="submit">
                          Tạo
                      </Button>
                  </ModalFooter>
              </Form>

          </Modal>
      </>
    );
}

export default Playlist;
