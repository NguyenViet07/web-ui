import React, {useEffect, useState} from "react";
import {Row, Col, Container, CardImg, Modal, ModalHeader, Form, ModalBody, Label, ModalFooter, Button} from 'reactstrap'
import MusicItem from "./MusicItem";
import {Group} from "../../components/form-group/form-group";
import InputController from "../../components/input-controller/input-controller";
import ValidateMessage from "../../components/validate-message";
import SelectBox from "../../components/select-box/select-box";
import {listStyleSong, listTypeSong} from "../../untility/mock";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {useMutation} from "react-fetching-library";
import {createAlbum} from "../../api/actions/album";

const defaultValueSearch = {
    albumName: null,
    imgAlbum: null
}

const Album = ({}) => {

    const {mutate: _createAlbum} = useMutation(createAlbum)

    const [modal, setModal] = useState(false)

    const [imageAlbum, setImageAlbum] = useState(null)

    const {control, handleSubmit, formState: {errors}, watch, setValue, register} = useForm({
        reValidateMode: "onChange",
        defaultValues: defaultValueSearch
    })

    async function onFileChange(files) {
        if (files?.length === 0) {
            setValue('imgAlbum', null)
            setImageAlbum(null)
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
            setValue('imgAlbum', null)
            setImageAlbum(null)
            return
        }
        const reader = new FileReader()
        reader.onload = () => {
            const logoUpload = reader.result
            // setValue('logo', logoUpload.split(',')[1])
            setImageAlbum(logoUpload)
        }
        reader.readAsDataURL(file)
    }

    const onSubmit = (data) => {

        const reader = new FileReader()
        reader.onload = async () => {
            const logoUpload = reader?.result
            const dataInput = {
                albumName: data.albumName,
                image: logoUpload,
            }
            const response = await _createAlbum(dataInput)
            if (response.payload?.errorCode === '200') {
                toggle()
            } else {
                toast.error(response.payload?.message)
            }
        }
        reader.readAsDataURL(data.logo ? data.logo[0] : null)
    };

    const toggle = async () => {
        setModal(!modal)
    }

    useEffect(() => {

    }, [])

    return (
      <>
      <Container>
          <h1>Album</h1>
          <Button onClick={toggle}>Tạo Album mới</Button>

          <Row>
            <Col className="bg-light border add-playlist" xs="3" >
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '180px', margin: '0 auto'}}>
                    <CardImg style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}} src="/imgs/image.jpg" alt="Card image cap" />
                </div>
                <span>Nhạc mới</span>
            </Col>
            <MusicItem />
          </Row>

      </Container>

          <Modal size="lg" isOpen={modal} style={{maxWidth: '1600px', width: '80%'}} centered={true}>
              <ModalHeader toggle={toggle}>Tạo Album mới</ModalHeader>
              <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                  <ModalBody>
                      <Row>
                          <Col md={6}>
                              <Group className="mb-3"  style={{paddingTop: '5px'}}>
                                  <Label>Tên album</Label>
                                  <InputController
                                      control={control}
                                      name="albumName"
                                      type="text"
                                  />
                                  <ValidateMessage
                                      message={errors && errors.albumName ? errors.albumName.message : ''}/>
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
                                      imageAlbum ? <CardImg
                                              style={{width: '300px', height: '300px', objectFit: 'cover'}}
                                              variant="top" src={imageAlbum}/> :
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

export default Album;
