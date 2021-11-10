import React from 'react';
import ValidateMessage from "../components/validate-message";
import {Controller, useForm} from "react-hook-form";
import {Card, CardBody, CardTitle , Form, Input, CardImg, FormGroup, Label, Button} from "reactstrap";
import {useMutation} from "react-fetching-library";
import {loginAction} from "../api/actions/login";
import {useHistory} from "react-router-dom"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {toast} from "react-toastify";
import {Group} from "../components/form-group/form-group";
import InputController from "../components/input-controller/input-controller";
import {useDispatch} from "react-redux";

const defaultValueSearch = {
    username: null,
    password: null
}

const Login = () => {

    const {mutate: _loginAction} = useMutation(loginAction)

    const history = useHistory()

    const dispatch = useDispatch()

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
            const action = {
                type: 'USER_NAME',
                data: response.payload.data.userInfo.userName
            }
            dispatch(action)
            history.push(`/`)
        } else {
            toast.error(response.payload?.message)
        }
    };

    return (
        <Card border="danger" style={{width: '30%', margin: 'auto', marginTop: '20px'}}>
            {/* <CardImg variant="top" className="w-100" src="/imgs/image.jpg"/> */}
            <CardBody>
                <CardTitle>Đăng nhập</CardTitle>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Group className="mb-3" controlId="formBasicEmail">
                        <Label>Tên tài khoản</Label>
                        <InputController
                            control={control}
                            name="username"
                            type="text"
                        />
                        <ValidateMessage message={errors && errors.username ? errors.username.message : ''}/>
                    </Group>
                    <Group className="mb-3" controlId="formBasicPassword">
                        <Label>Mật khẩu</Label>
                        <InputController
                            control={control}
                            name="password"
                            type="password"
                        />
                        <ValidateMessage message={errors && errors.password ? errors.password.message : ''}/>
                    </Group>
                    {/*<Group className="mb-3" controlId="formBasicCheckbox">*/}
                    {/*    <Input type="checkbox" label="Lưu đăng nhập"/>*/}
                    {/*    Lưu mật khẩu*/}
                    {/*</Group>*/}
                    <Button type="submit">Đăng nhập</Button>
                </Form>

            </CardBody>
        </Card>
    );
};

export default Login;
