import React, {useState} from 'react';
import {Form, Button, Card} from 'react-bootstrap';
import ValidateMessage from "../components/validate-message";
import {Controller, useForm} from "react-hook-form";
import {Input} from "reactstrap";
import * as classnames from "classnames";
import {creatUser} from "../api/actions/users";
import {useMutation} from "react-fetching-library";
import {useHistory} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";


const defaultValueSearch = {
    username: null,
    password: null,
    roleId: null
}

const CreateUser = () => {

    const {mutate: _creatUser} = useMutation(creatUser)

    const history = useHistory()

    const {control, handleSubmit, formState: {errors}} = useForm({
        reValidateMode: "onChange",
        defaultValues: defaultValueSearch
    })

    const onSubmit = async (data) => {
        const response = await _creatUser(data)
        if (response.payload?.errorCode === '200') {
            history.push(`/`)
        } else {
            console.log('vào đây')
            // alert(response.payload?.message)
            toast.error(response.payload?.message)
        }
    };

    return (
        <>
            <Card border="danger" style={{width: '30%', margin: 'auto', marginTop: '20px'}}>
                <Card.Img variant="top" className="w-100" src="/imgs/photo.jpg"/>
                <Card.Body>
                    <Card.Title>Đăng ký</Card.Title>
                    <Form>
                        <Card.Text>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Tên đăng nhập</Form.Label>
                                <Controller
                                    control={control}
                                    name="username"
                                    rules={{ required: true }}
                                    render={( {field} ) => {
                                        return <Input {...field} />
                                    }}
                                    className={classnames({'is-invalid': errors[`username`]})}
                                />
                                <ValidateMessage
                                    message={errors && errors.username ? errors.username.message : ''}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Mật khẩu</Form.Label>
                                <Controller
                                    control={control}
                                    name="password"
                                    rules={{ required: true }}
                                    render={( {field} ) => {
                                        return <Input {...field} />
                                    }}
                                    className={classnames({'is-invalid': errors[`password`]})}
                                />
                                <ValidateMessage
                                    message={errors && errors.password ? errors.password.message : ''}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Quyền</Form.Label>
                                <Controller
                                    control={control}
                                    name="roleId"
                                    rules={{ required: true }}
                                    render={( {field} ) => {
                                        return <Input type={'number'} {...field} />
                                    }}
                                    className={classnames({'is-invalid': errors[`role`]})}
                                />
                                <ValidateMessage
                                    message={errors && errors.roleId ? errors.roleId.message : ''}/>
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
