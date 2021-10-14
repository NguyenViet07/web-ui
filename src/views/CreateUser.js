import React, {useState} from 'react';
import {Form, Button, Card} from 'react-bootstrap';
import ValidateMessage from "../components/validate-message";
import {Controller, useForm} from "react-hook-form";
import {Input} from "reactstrap";
import {creatUser} from "../api/actions/users";
import {useMutation} from "react-fetching-library";
import {useHistory} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import InputController from "../components/input-controller/input-controller";


const defaultValueSearch = {
    name: null,
    username: null,
    password: null,
    isSinger: false,
    company: null,
    identityCard: null,
}

const CreateUser = () => {

    const {mutate: _creatUser} = useMutation(creatUser)

    const history = useHistory()

    const [checkSinger, setCheckSinger] = useState(false)

    const signInSchema = yup.object().shape({
        username: yup.string().required('Vui lòng nhập tên đăng nhập').nullable(),
        password: yup.string().required('Vui lòng nhập mật khẩu').nullable()
    })

    const {control, handleSubmit, formState: {errors}, watch} = useForm({
        reValidateMode: "onChange",
        defaultValues: defaultValueSearch,
        resolver: yupResolver(signInSchema)
    })

    // const checkSinger = watch('isSinger')

    const onSubmit = async (data) => {
        console.log('data', data)
        // const response = await _creatUser(data)
        // if (response.payload?.errorCode === '200') {
        //     history.push(`/`)
        // } else {
        //     toast.error(response.payload?.message)
        // }
    };

    return (
        <>
            <Card border="danger" style={{width: '50%', margin: 'auto', marginTop: '20px'}}>
                <Card.Img variant="top" className="w-100" src="/imgs/photo.jpg"/>
                <Card.Body>
                    <Card.Title>Đăng ký</Card.Title>
                    <Form>
                        <Card.Text>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Họ và tên đầy đủ</Form.Label>
                                <InputController
                                    control={control}
                                    name="name"
                                    type="text"
                                />
                                <ValidateMessage
                                    message={errors && errors.name ? errors.name.message : ''}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Tên đăng nhập</Form.Label>
                                <InputController
                                    control={control}
                                    name="username"
                                    type="text"
                                />
                                <ValidateMessage
                                    message={errors && errors.username ? errors.username.message : ''}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Mật khẩu</Form.Label>
                                <InputController
                                    control={control}
                                    name="password"
                                    type="password"
                                />
                                <ValidateMessage
                                    message={errors && errors.password ? errors.password.message : ''}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Xác nhận lại mật khẩu</Form.Label>
                                <InputController
                                    control={control}
                                    name="passwordConfirm"
                                    type="password"
                                />
                                <ValidateMessage
                                    message={errors && errors.password ? errors.password.message : ''}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Ca sĩ</Form.Label>
                                <InputController
                                    control={control}
                                    name="isSinger"
                                    type="checkbox"
                                    onChange={val => {
                                        setCheckSinger(val.target.checked)
                                    }}
                                />
                            </Form.Group>
                            {
                                checkSinger && <>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Công ty hoặc đại diên</Form.Label>
                                        <InputController
                                            control={control}
                                            name="company"
                                            type="text"
                                        />
                                        <ValidateMessage
                                            message={errors && errors.company ? errors.company.message : ''}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Chứng minh thư / hộ chiếu người đại diện</Form.Label>
                                        <InputController
                                            control={control}
                                            name="identityCard"
                                            type="text"
                                        />
                                        <ValidateMessage
                                            message={errors && errors.identityCard ? errors.identityCard.message : ''}/>
                                    </Form.Group>
                                </>
                            }
                        </Card.Text>
                        <Button variant="primary" type="submit" onClick={handleSubmit(onSubmit)}>
                            Đăng ký
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>

    );
};

export default CreateUser;
