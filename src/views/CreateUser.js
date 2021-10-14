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
    username: null,
    password: null,
    isSinger: false,

}

const CreateUser = () => {

    const {mutate: _creatUser} = useMutation(creatUser)

    const history = useHistory()

    const signInSchema = yup.object().shape({
        username: yup.string().required('Vui lòng nhập tên đăng nhập').nullable(),
        password: yup.string().required('Vui lòng nhập mật khẩu').nullable()
    })

    const {control, handleSubmit, formState: {errors}} = useForm({
        reValidateMode: "onChange",
        defaultValues: defaultValueSearch,
        resolver: yupResolver(signInSchema)
    })

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
                                        console.log('val', val)
                                    }}
                                />
                                <ValidateMessage
                                    message={errors && errors.isSinger ? errors.isSinger.message : ''}/>
                            </Form.Group>
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
