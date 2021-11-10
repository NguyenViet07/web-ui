
import React, {useEffect, useState} from "react";
import {
    CardGroup,
    Card,
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
import Info from "./Info";


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

    const getUserByUserName = async (usernameInput) => {
        const response = await _findByUserName({ username: usernameInput })
        if (response.payload?.errorCode === '200') {
            setUserInfoView(response.payload?.data)
        } else {
            setUserInfoView(null)
        }
    };



    useEffect(() => {

        const userData = JSON.parse(localStorage.getItem('userData'))
        if (userData?.user?.avatar) {
            setLogo(userData?.user?.avatar)
        }
        if (userData?.user?.userName) {
            getUserByUserName(userData?.user?.userName)
        } else {
            setUserInfoView(null)
        }
    }, [])

    return (
        <>
            <Info userView={userInfoView} />
        </>
    );
};

export default Index;
