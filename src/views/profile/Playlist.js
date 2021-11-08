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
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {createPlaylist, getListMyPlaylist} from "../../api/actions/playlist";
import MusicItem from "./MusicItem";

const defaultValueSearch = {
    namePlaylist: null,
    imgPlaylist: null
}

const Playlist = ({}) => {

    const {mutate: _createPlaylist} = useMutation(createPlaylist)
    const {mutate: _getListMyPlaylist} = useMutation(getListMyPlaylist)


    const [modal, setModal] = useState(false)

    const [imagePlaylist, setImagePlaylist] = useState(null)
    const [listMyPlaylist, setListMyPlaylist ] = useState(null)


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

    const onSubmit = async (data) => {

        if (data.imgPlaylist?.length > 0 ) {
            const reader = new FileReader()
            reader.onload = async () => {
                const logoUpload = reader?.result
                const dataInput = {
                    namePlaylist: data.namePlaylist,
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
        } else {
            const dataInput = {
                namePlaylist: data.namePlaylist
            }
            const response = await _createPlaylist(dataInput)
            if (response.payload?.errorCode === '200') {
                toggle()
            } else {
                toast.error(response.payload?.message)
            }
        }

    };

    const toggle = async () => {
        setModal(!modal)
    }

    useEffect(async () => {
        const response = await _getListMyPlaylist({})
        if (response.payload?.errorCode === '200') {
            console.log('aaa', response.payload.data)
            setListMyPlaylist(response.payload?.data)
        } else {
            toast.error(response.payload?.message)
        }
    }, [])

    return (
      <>
        <Container>
          <h1>Playlist</h1>
            <Button onClick={toggle}>Tạo playlist mới</Button>
            {
                listMyPlaylist?.map(el => {
                        return(
                            <Row>
                                <Col className="bg-light border add-playlist" xs="3">
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        width: '100%',
                                        height: '180px',
                                        margin: '0 auto'
                                    }}>
                                        {
                                            el.image ?
                                                <CardImg style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}
                                                         src={el.image} alt="Card image cap"/> :
                                                <CardImg style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}
                                                         src="/imgs/image.jpg" alt="Card image cap"/>
                                        }
                                    </div>
                                    <span>{el.namePlaylist}</span>
                                </Col>
                                <MusicItem/>
                            </Row>
                        )
                    }
                )
            }
        </Container>

          <Modal size="lg" isOpen={modal} style={{maxWidth: '1600px', width: '80%'}} centered={true}>
              <ModalHeader toggle={toggle}>Tạo Playlist mới</ModalHeader>
              <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                  <ModalBody>
                      <Row>
                          <Col md={6}>
                              <Group className="mb-3"  style={{paddingTop: '5px'}}>
                                  <Label>Tên Playlist</Label>
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
                                      id={'imgPlaylist'}
                                      accept=".png, .jpg, .jpeg"
                                      {...register("imgPlaylist")}
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
