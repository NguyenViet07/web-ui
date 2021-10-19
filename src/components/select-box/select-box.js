import Select from 'react-select'
import * as classnames from "classnames"
import {Controller} from "react-hook-form"
import React, {useCallback, useEffect, useRef, useState} from "react"
import Proptypes from 'prop-types'

export const SelectBox = ({ rules, options = [], error, classError, control, name, labelOpt, valueOpt, placeholder = 'Chọn',
                              separator = ' - ', objectValue, isMulti = false, isDisabled = false, ...props }) => {

    const [_placeholder, setPlaceholder] = useState(placeholder)

    const selectRef = useRef(null)

    useEffect(() => {
        setPlaceholder(placeholder)
    }, [placeholder])

    const handleSelectChange = (onChange, value) => {
        if (!value) {
            onChange(null)
            return
        }
        if (isMulti || objectValue) {
            onChange(value)
        } else {
            onChange(value[valueOpt])
        }
    }

    const toggle = () => {
        console.log(selectRef.current.onMenuOpen())
        console.log(selectRef.current.select.focus())
    }

    const customFilter = ({label, value, data}, inputValue) => {
        if (inputValue) {
            return label.toLowerCase().includes(inputValue.toLowerCase())
        } else {
            return true
        }
    }

    const setDefaultValue = (value) => {
        if (isMulti || objectValue) {
            return value
        } else return options.find(c => c[valueOpt] === value) || null
    }

    const focusWhenError = () => {
        const ref = selectRef.current.select
        ref.focus()
        ref.controlRef.scrollIntoView({behavior: 'smooth', block: 'center'})
    }

    return (<Controller
        name={name}
        control={control}
        onFocus={focusWhenError}
        render={({onChange, value, ...propsRender}) => (
            <Select
                id={name}
                { ...propsRender }
                isDisabled={isDisabled}
                isClearable
                isMulti={isMulti}
                options={options}
                filterOption={customFilter}
                placeholder={_placeholder}
                value={setDefaultValue(value)}
                getOptionValue={(opt) => opt[valueOpt]}
                getOptionLabel={opt => (Array.isArray(labelOpt) ? `${opt[labelOpt[0]]}${separator}${opt[labelOpt[1]]}` : opt[labelOpt])}
                onChange={(value) => {
                    handleSelectChange(onChange, value)
                }}
                onMenuOpen={() => setPlaceholder('')}
                onMenuClose={() => setPlaceholder(placeholder)}
                noOptionsMessage={() => "Không có dữ liệu"}
                ref={selectRef}
                closeMenuOnSelect={!isMulti}
                classNamePrefix='select'
                className={classnames('react-select', 'custom-async-select', { 'is-invalid': error }, classError)}
                { ...props }
            />
        )}
        rules={rules}
    />)
}

SelectBox.propTypes = {
    options: Proptypes.array.isRequired,
    control: Proptypes.any.isRequired,
    name: Proptypes.string.isRequired,
    labelOpt: Proptypes.any,
    valueOpt: Proptypes.any,
    rules: Proptypes.any,
    classError: Proptypes.any
}

SelectBox.defaultProps = {
    options: [],
    labelOpt: 'label',
    valueOpt: 'value',
    rules: null
}

const SelectValidateWithApi = ({ promiseValidate, ...props }) => {
    const onChange = useCallback(async (value) => {
        await promiseValidate(value)
    }, [])

    return <SelectBox onChange={onChange} {...props} />
}

export { SelectValidateWithApi }

export default SelectBox
