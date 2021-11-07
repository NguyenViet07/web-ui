import React, {useEffect, useState} from "react";
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
    Modal, ModalHeader, ModalBody, ModalFooter, Input
} from "reactstrap";
import {useMutation} from "react-fetching-library";
import {createSong, getListSongByUserId} from "../../api/actions/song";
import {Controller, useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import {Group} from "../../components/form-group/form-group";
import InputController from "../../components/input-controller/input-controller";
import ValidateMessage from "../../components/validate-message";
import {useDispatch, useSelector} from "react-redux";
import song from "../../redux/reducer/song";
import {listStyleSong, listTypeSong} from "../../untility/mock";
import Select from "react-select";
import SelectBox from "../../components/select-box/select-box";


const defaultValueSearch = {
    songName: null,
    description: null,
    dataFile: null,
    imgSong: null,
    style: null,
    type: null
}

const Song = ({}) => {
    const {mutate: _createSong} = useMutation(createSong)

    const {mutate: _getListSongByUserId} = useMutation(getListSongByUserId)

    const [modal, setModal] = useState(false)

    const [listMySong, setListMySong] = useState([])

    const [imageSong, setImageSong] = useState(null)

    const {control, handleSubmit, formState: {errors}, watch, setValue, register} = useForm({
        reValidateMode: "onChange",
        defaultValues: defaultValueSearch
    })

    const history = useHistory()

    const dispatch = useDispatch()

    const listerToMusic = songValue => {
        const action = {
            type: 'SONG_VALUE',
            data: songValue
        }
        dispatch(action)
    }

    const getListMySong = async () => {
        const response = await _getListSongByUserId({  })
        if (response.payload?.errorCode === '200') {
            setListMySong(response.payload?.data?.content)
        } else {
            setListMySong([])
        }
    };

    async function onFileChange(files) {
        if (files?.length === 0) {
            setValue('imgSong', null)
            setImageSong(null)
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
            setValue('imgSong', null)
            setImageSong(null)
            return
        }
        const reader = new FileReader()
        reader.onload = () => {
            const logoUpload = reader.result
            // setValue('logo', logoUpload.split(',')[1])
            setImageSong(logoUpload)
        }
        reader.readAsDataURL(file)
    }

    const onSubmit = async (data) => {

        console.log('dddd', data)

        // const reader = new FileReader()
        // reader.onload = async () => {
        //     const imageUpload = reader?.result
        //     const formData = new FormData();
        //     formData.append('dataSongValue', data.dataFile[0]);
        //     formData.append('songName', data.songName);
        //     formData.append('description', data.description);
        //     formData.append('image', imageUpload);
        //     const response = await _createSong(formData)
        //     if (response.payload?.errorCode === '200') {
        //         toggle()
        //         getListMySong()
        //         toast.success('Tạo bài hát thành công')
        //     } else {
        //         toast.error(response.payload?.message)
        //     }
        // }
        // reader.readAsDataURL(data?.imgSong[0])


    };

    const toggle = async () => {
        setModal(!modal)
    }


    useEffect(() => {
        getListMySong()
    }, [])


    return (
      <>
        <Container>
          <Row>
              <div style={{marginBottom: '10px'}}>
                  <Col>
                      <h1>Danh sách bài hát</h1>
                      <Button onClick={toggle}>Tạo bài hát mới</Button>
                  </Col>
              </div>
              {
                  listMySong.map(el => {
                      return <Col md={3}>
                          <Card onClick={() => {
                              listerToMusic(el)
                          }}>
                              {
                                  el.image ? <CardImg
                                          style={{width: '100px', height: '100px', objectFit: 'cover'}}
                                          variant="top" src={el.image}/> :
                                      <CardImg
                                          style={{width: '100px', height: '100px', objectFit: 'cover'}}
                                          variant="top" src='/imgs/pika.jpg'/>
                              }

                              <CardBody>
                                  <CardTitle tag="h5"><span >{el.songName}</span></CardTitle>
                                  <CardSubtitle tag="h6"
                                                className="mb-2 text-muted">{el.createDate}</CardSubtitle>
                                  <CardText>{el.description}</CardText>
                              </CardBody>
                          </Card>
                      </Col>
                  })
              }
          </Row>
        </Container>

          <Modal size="lg" isOpen={modal} style={{maxWidth: '1600px', width: '80%'}} centered={true}>
              <ModalHeader toggle={toggle}>Tải bài hát mới</ModalHeader>
              <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                  <ModalBody>
                      <Row>
                          <Col md={6}>
                              <Group className="mb-3"  style={{paddingTop: '5px'}}>
                                  <Label>Tên bài hát</Label>
                                  <InputController
                                      control={control}
                                      name="songName"
                                      type="text"
                                  />
                                  <ValidateMessage
                                      message={errors && errors.name ? errors.name.message : ''}/>
                              </Group>
                              <Group className="mb-3" controlId="formBasicEmail" style={{paddingTop: '5px'}}>
                                  <Label>Mô tả</Label>
                                  <InputController
                                      control={control}
                                      name="description"
                                      type="text"
                                  />
                              </Group>
                              <Group className="mb-3" controlId="formBasicEmail" style={{paddingTop: '5px'}}>
                                  <Label>Thể loại nhạc</Label>
                                  <SelectBox
                                      name="type"
                                      valueOpt="value"
                                      labelOpt="label"
                                      control={control}
                                      options={listStyleSong}
                                      placeholder={''}
                                  />
                              </Group>
                              <Group className="mb-3" controlId="exampleSelect" style={{paddingTop: '5px'}}>
                                  <Label>Quốc gia</Label>
                                  <SelectBox
                                      name="type"
                                      valueOpt="value"
                                      labelOpt="label"
                                      control={control}
                                      options={listTypeSong}
                                      placeholder={''}
                                  />
                              </Group>
                              <Group className="mb-3" controlId="exampleSelect" style={{paddingTop: '5px'}}>
                                  <Label>Ảnh bài hát</Label>
                                  <input
                                      id="logo"
                                      accept=".png, .jpg, .jpeg"
                                      {...register("imgSong")}
                                      type="file"
                                      onChange={({target: {files}}) => {
                                          onFileChange(files)
                                      }}
                                  />
                              </Group>
                              <Group className="mb-3" controlId="formBasicEmail" style={{paddingTop: '5px'}}>
                                  <Label style={{marginRight: '10px'}}>File nhạc</Label>
                                  <input {...register("dataFile")} accept=".mp3" type="file" />
                              </Group>
                          </Col>
                          <Col md={6}>
                              <div style={{display: 'flex', justifyContent: 'center'}}>
                                  {
                                      imageSong ? <CardImg
                                              style={{width: '300px', height: '300px', objectFit: 'cover'}}
                                              variant="top" src={imageSong}/> :
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
                          Đăng ký
                      </Button>
                  </ModalFooter>
              </Form>

          </Modal>
      </>
    );
}

export default Song;
