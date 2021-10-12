import PropTypes from 'prop-types'
import * as classnames from "classnames"
import {Controller} from "react-hook-form"
import React, {Fragment, useEffect, useRef} from "react"
import {DebounceInput} from "react-debounce-input"

/* Hiện chỉ dùng cho input text */
/* Mục đích là do React-select đang là unController , nên khi valid sẽ ưu tiên focus error cho những input register trước,
    nên cần đồng bộ theo thứ tự sắp xếp để valid */
const InputController = ({name, control, rules, classError, error, isNumber, debounce, disabled, capitalCase, handleBlur, ...props}) => {

    const cusRef = useRef()

    const debounceTime = useRef(0)

    useEffect(() => {
        if (debounce) {
            debounceTime.current = 400
        }
    }, [])

    const focusWhenError = () => {
        const ref = cusRef.current.props.inputRef.current
        ref.focus()
        ref.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            onFocus={focusWhenError}
            render={({ref, value, ...propsRender}) => (
                <Fragment>
                    <DebounceInput
                        id={name}
                        inputRef={ref}
                        ref={cusRef}
                        {...propsRender}
                        disabled={disabled}
                        value={(value === null || value === undefined) ? '' : value}
                        debounceTimeout={debounceTime.current}
                        style={{paddingRight: '34px'}}
                        className={classnames('form-control', {'is-invalid': error}, classError)}
                        {...props}
                    />
                </Fragment>
            )}
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
