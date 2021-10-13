import React, {useState} from 'react';
import {Form, Button, Card} from 'react-bootstrap';
import ValidateMessage from "../components/validate-message";
import {Controller, useForm} from "react-hook-form";
import {Input} from "reactstrap";
import * as classnames from "classnames";
import {useMutation} from "react-fetching-library";
import {loginAction} from "../api/actions/login";
import {useHistory} from "react-router-dom"
import {toast} from "react-toastify";
import {ValidateFeedback} from "../components/validate-feedback";

const defaultValueSearch = {
    username: null,
    password: null
}

const Login = () => {

    const {mutate: _loginAction} = useMutation(loginAction)

    const history = useHistory()


    const {control, handleSubmit, formState: {errors}} = useForm({
        reValidateMode: "onChange",
        defaultValues: defaultValueSearch
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
                                rules={{ required: true }}
                                render={( {field} ) => {
                                    return <Input {...field} />
                                }}
                            />
                            <ValidateFeedback label="Tên đăng nhập" error={errors.username}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Controller
                                control={control}
                                name="password"
                                type={'password'}
                                rules={{ required: true }}
                                render={( {field} ) => {
                                    return <Input {...field} />
                                }}
                                className={classnames({'is-invalid': errors[`password`]})}
                            />
                            <ValidateMessage
                                message={errors && errors.password ? errors.password.message : ''}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Lưu đăng nhập"/>
                        </Form.Group>
                    </Card.Text>
                    <Button variant="primary" type="submit">
                        Đăng nhập
                    </Button>
                </Form>

            </Card.Body>
        </Card>
    );
};

export default Login;
