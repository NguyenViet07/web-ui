import React, {useRef} from "react"
import * as classnames from 'classnames'
import {useFormContext} from "react-hook-form"
import {Col, Label} from "reactstrap"
import Proptypes from "prop-types"

// Show message
import ValidateMessage from "../validate-message"

// Control
import SelectBox from "../select-box/select-box"
import {DatePicker} from "../date-picker/date-picker"
import InputController from "../input-controller/input-controller";


export const TypeControl = {
    text: 'text',
    select: 'select',
    asyncSelect: 'asyncSelect',
    datepicker: 'datepicker'
}

const Control = {
    [TypeControl.text]: InputController,
    [TypeControl.select]: SelectBox,
    [TypeControl.datepicker]: DatePicker
}

const FormControl = ({type, col, name, rules, label, crossLabel, required, hint, ...props}) => {

    const {control, errors} = useFormContext()

    const Tag = useRef(Control[type])

    return (
        <Col {...col}>
            <Group>
                <Label for={name}>{label} {required && <span className="required"> *</span>}</Label>
                <Tag.current
                    name={name}
                    rules={{...required && {required: true}, ...rules}}
                    control={control}
                    error={errors[name]}
                    {...props}
                />
                <ValidateMessage message={hint}/>
            </Group>
        </Col>
    )

}

FormControl.propTypes = {
    name: Proptypes.string.isRequired,
    label: Proptypes.string.isRequired,
    rules: Proptypes.any,
    error: Proptypes.any,
    col: Proptypes.object,
    control: Proptypes.any,
    hint: Proptypes.string,
    required: Proptypes.bool,
    options: Proptypes.array,
    crossLabel: Proptypes.string,
    placeholder: Proptypes.string,
    type: Proptypes.oneOf(Object.values(TypeControl))
}

FormControl.defaultProps = {
    options: [],
    required: false,
    type: TypeControl.text,
    col: {}
}

export default FormControl

export const Group = ({ children, className, ...props }) => {
    return (
        <div className={classnames('form-group cus-form-group', className)} {...props}>
            {children}
        </div>
    )
}
