import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useMutation} from "react-fetching-library";
import {useHistory} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {Card, CardImg, Form, Button, CardBody, CardTitle, Label} from "reactstrap";
import {creatUser} from "../../api/actions/users";
import {Group} from "../../components/form-group/form-group";
import InputController from "../../components/input-controller/input-controller";
import ValidateMessage from "../../components/validate-message";


const defaultValueSearch = {
    name: null,
    username: null,
    password: null,
    passwordConfirm: null,
    isSinger: false,
    company: null,
    identityCard: null,
}

const ModalEdit = ({user}) => {

    const {mutate: _creatUser} = useMutation(creatUser)

    const history = useHistory()

    const [checkSinger, setCheckSinger] = useState(false)

    const signInSchema = yup.object().shape({
        username: yup.string().required('Vui lòng nhập tên đăng nhập').nullable(),
        password: yup.string().required('Vui lòng nhập mật khẩu').nullable(),
        passwordConfirm: yup.string().required('Vui lòng xác nhận mật khẩu').nullable()
    })

    const {control, handleSubmit, formState: {errors}, watch, setValue} = useForm({
        reValidateMode: "onChange",
        defaultValues: defaultValueSearch,
        resolver: yupResolver(signInSchema)
    })

    // const checkSinger = watch('isSinger')

    const onSubmit = async (data) => {
        const response = await _creatUser(data)
        if (response.payload?.errorCode === '200') {
            history.push(`/`)
        } else {
            toast.error(response.payload?.message)
        }
    };

    useEffect(() => {
        console.log('data', user)
        if (user) {
            setValue('name', user.name)
            setValue('username', user.username)
            if (user.isSinger === 1) {
                setValue('isSinger', true)
            } else {
                setValue('isSinger', false)
            }
        }
    }, [user])

    return (
        <>
            <Card border="danger" style={{ margin: 'auto', marginTop: '20px'}}>
                <CardImg variant="top" className="w-100" src="/imgs/photo.jpg"/>
                <CardBody>
                    <CardTitle>Đăng ký</CardTitle>
                    <Form>
                        <Group className="mb-3" controlId="formBasicEmail" style={{paddingTop: '5px'}}>
                            <Label>Họ và tên đầy đủ</Label>
                            <InputController
                                control={control}
                                name="name"
                                type="text"
                            />
                            <ValidateMessage
                                message={errors && errors.name ? errors.name.message : ''}/>
                        </Group>
                        <Group className="mb-3" controlId="formBasicEmail" style={{paddingTop: '5px'}}>
                            <Label>Tên đăng nhập</Label>
                            <InputController
                                control={control}
                                name="username"
                                type="text"
                                disabled={true}
                            />
                        </Group>
                        <Group className="mb-3" controlId="formBasicPassword" style={{paddingTop: '5px'}}>
                            <Label>Ca sĩ</Label>
                            <InputController
                                control={control}
                                name="isSinger"
                                type="checkbox"
                                disabled={true}
                            />
                        </Group>
                        {
                            checkSinger && <>
                                <Group className="mb-3" controlId="formBasicPassword" style={{paddingTop: '5px'}}>
                                    <Label>Công ty hoặc đại diên</Label>
                                    <InputController
                                        control={control}
                                        name="company"
                                        type="text"
                                    />
                                    <ValidateMessage
                                        message={errors && errors.company ? errors.company.message : ''}/>
                                </Group>
                                <Group className="mb-3" controlId="formBasicPassword" style={{paddingTop: '5px'}}>
                                    <Label>Chứng minh thư / hộ chiếu người đại diện</Label>
                                    <InputController
                                        control={control}
                                        name="identityCard"
                                        type="text"
                                    />
                                    <ValidateMessage
                                        message={errors && errors.identityCard ? errors.identityCard.message : ''}/>
                                </Group>
                            </>
                        }

                        <Button variant="primary" type="submit" onClick={handleSubmit(onSubmit)}>
                            Đăng ký
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </>

    );
};

export default ModalEdit;
