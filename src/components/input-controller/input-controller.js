import PropTypes from 'prop-types'
import * as classnames from "classnames"
import {Controller} from "react-hook-form"
import React, {Fragment, useEffect, useRef} from "react"
import {DebounceInput} from "react-debounce-input"
import {Input} from "reactstrap";
import {Form} from "react-bootstrap";

/* Hiện chỉ dùng cho input text */
/* Mục đích là do React-select đang là unController , nên khi valid sẽ ưu tiên focus error cho những input register trước,
    nên cần đồng bộ theo thứ tự sắp xếp để valid */
const InputController = ({name, control, rules, classError, error, isNumber, type, debounce, disabled, capitalCase, handleBlur, ...props}) => {

    const debounceTime = useRef(0)

    useEffect(() => {
        if (debounce) {
            debounceTime.current = 400
        }
    }, [])

    return (
        <Controller
            control={control}
            name={name}
            render={( {field} ) => {
                return <Input type={type} style={{ marginLeft: '10px'}} {...field} />
            }}
        />
    )
}
InputController.propTypes = {
    control: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    rules: PropTypes.any,
    classError: PropTypes.any,
    isNumber: PropTypes.bool,
    debounce: PropTypes.bool,
    capitalCase: PropTypes.bool
}

InputController.defaultProps = {
    rules: null,
    isNumber: false,
    debounce: false,
    capitalCase: false
}

export default InputController
