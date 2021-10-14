import React from 'react';
import {Form, Button, Card} from 'react-bootstrap';
import ValidateMessage from "../components/validate-message";
import {Controller, useForm} from "react-hook-form";
import {Input, FormGroup, Label} from "reactstrap";
import {useMutation} from "react-fetching-library";
import {loginAction} from "../api/actions/login";
import {useHistory} from "react-router-dom"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {toast} from "react-toastify";

const defaultValueSearch = {
    username: null,
    password: null
}

const Login = () => {

    const {mutate: _loginAction} = useMutation(loginAction)

    const history = useHistory()

    const signInSchema = yup.object().shape({
        username: yup.string().required('Vui lòng nhập tên đăng nhập').nullable(),
        password: yup.string().required('Vui lòng nhập mật khẩu').nullable()
    })

    const {control, handleSubmit, formState: {errors}, register} = useForm({
        reValidateMode: "onChange",
        defaultValues: defaultValueSearch,
        resolver: yupResolver(signInSchema)
    })

    const onSubmit = async (data) => {
        const response = await _loginAction(data)
        if (response.status === 200 && response.payload?.errorCode === '200') {
            localStorage.setItem("token", response.payload.data.token)
            localStorage.setItem('userData', JSON.stringify({
                user: response.payload.data.userInfo,
                role: response.payload.data.roleName
            }))
            history.push(`/`)
        } else {
            toast.error(response.payload?.message)
        }
    };

    return (
        <Card border="danger" style={{width: '30%', margin: 'auto', marginTop: '20px'}}>
            <Card.Img variant="top" className="w-100" src="/imgs/image.jpg"/>
            <Card.Body>
                <Card.Title>Đăng nhập</Card.Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Card.Text>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Tên tài khoản</Form.Label>
                            <Controller
                                control={control}
                                name="username"
                                render={( {field} ) => {
                                    return <Input {...field} />
                                }}
                            />
                            <ValidateMessage message={errors && errors.username ? errors.username.message : ''}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Controller
                                control={control}
                                name="password"
                                render={( {field} ) => {
                                    return <Input {...field} />
                                }}
                            />
                            <ValidateMessage message={errors && errors.password ? errors.password.message : ''}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Lưu đăng nhập"/>
                        </Form.Group>
                        <Button type="submit">
                            Đăng nhập
                        </Button>
                    </Card.Text>
                </Form>

            </Card.Body>
        </Card>
    );
};

export default Login;
