

import React, {useEffect, useState} from "react";
import {
    CardGroup,
    Card,
    CardHeader,
    CardSubtitle,
    CardText,
    CardBody,
    CardTitle,
    Row,
    Col,
    Label,
    CardImg,
    Button, Form
} from 'reactstrap'

import {SEARCH_BLOCK, SEARCH_RESULT_BLOCK} from "../../constants";
import InputController from "../../components/input-controller/input-controller";
import {Group} from "../../components/form-group/form-group";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation} from "react-fetching-library";
import { findByUserName} from "../../api/actions/users";
import {toast} from "react-toastify";
import ValidateMessage from "../../components/validate-message";
import {createSong, getListSongByUserId} from "../../api/actions/song";
import {useHistory} from "react-router-dom";


const defaultValueSearch = {
    songName: null,
    description: null,
    dataFile: null
}

const Index = ({}) => {

    const {mutate: _findByUserName} = useMutation(findByUserName)
    const {mutate: _createSong} = useMutation(createSong)

    const {mutate: _getListSongByUserId} = useMutation(getListSongByUserId)

    const [userInfoView, setUserInfoView] = useState(null)
    const [logo, setLogo] = useState(null)
    const [listMySong, setListMySong] = useState([])

    const {control, handleSubmit, formState: {errors}, watch, setValue, register} = useForm({
        reValidateMode: "onChange",
        defaultValues: defaultValueSearch
    })

    const history = useHistory()

    const getUserByUserName = async (usernameInput) => {
        const response = await _findByUserName({ username: usernameInput })
        if (response.payload?.errorCode === '200') {
            setUserInfoView(response.payload?.data)
        } else {
            setUserInfoView(null)
        }
    };

    const getListMySong = async () => {
        const response = await _getListSongByUserId({  })
        if (response.payload?.errorCode === '200') {
            setListMySong(response.payload?.data?.content)
        } else {
            setListMySong([])
        }
    };

    const onSubmit = async (data) => {
        const dataInput = {
            dataSongValue: data.dataFile[0],
            song: {
                songName: data.songName,
                description: data.description,
            }
        }
        const formData = new FormData();
        formData.append('dataSongValue', data.dataFile[0]);
        formData.append('songName', data.songName);
        formData.append('description', data.description);
        const response = await _createSong(formData)
        if (response.status === 200 && response.payload?.errorCode === '200') {
            toast.success('Tạo bài hát thành công')
        } else {
            toast.error(response.payload?.message)
        }
    };

    useEffect(() => {

        const userData = JSON.parse(localStorage.getItem('userData'))
        if (userData?.user?.avatar) {
            setLogo(userData?.user?.avatar)
        }
        // setUserData(userData1)
        if (userData?.user?.userName) {
            getUserByUserName(userData?.user?.userName)
            getListMySong()
        } else {
            setUserInfoView(null)
        }
    }, [])

    return (
        <>
            <div border="danger" style={{ marginLeft: '10%', marginRight: '10%', marginTop: '5%'}}>
                <CardGroup>
                    <Row>
                        <Col md={3}>
                            <Card>
                                <CardImg variant="top" className="w-100" src={logo}/>
                                <CardBody>
                                    <CardTitle tag="h5">{userInfoView?.username}</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">{userInfoView?.name}</CardSubtitle>
                                    {/*<CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>*/}
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={9}>
                            <Row>
                                <CardBody>
                                    <CardTitle tag="h5">Tạo bài hát</CardTitle>
                                    <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
                                            <Label>File</Label>
                                            <input {...register("dataFile")} type="file" />
                                            {/*<InputController*/}
                                            {/*    control={control}*/}
                                            {/*    name="dataFile"*/}
                                            {/*    type="file"*/}
                                            {/*/>*/}
                                        </Group>

                                        <Button variant="primary" type="submit">
                                            Đăng ký
                                        </Button>
                                    </Form>
                                </CardBody>
                            </Row>
                            <Row>
                                {
                                    listMySong.map(el => {
                                        return <Col md={3}>
                                            <Card>
                                                <CardImg width="10px" src="/imgs/photo.jpg" alt="Card image cap"/>
                                                <CardBody>
                                                    <CardTitle tag="h5">{el.songName}</CardTitle>
                                                    <CardSubtitle tag="h6"
                                                                  className="mb-2 text-muted">{el.createDate}</CardSubtitle>
                                                    <CardText>{el.description}</CardText>
                                                    <Button onClick={() => {
                                                        history.push(`/song/${el.songId}`)
                                                    }}>Button</Button>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    })
                                }
                            </Row>

                        </Col>
                    </Row>
                </CardGroup>
            </div>
        </>
    );
};

export default Index;
