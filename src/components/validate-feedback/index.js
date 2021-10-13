import React, {useCallback} from "react"
import {FormFeedback} from "reactstrap"
import PropTypes from "prop-types"


export const ERROR_TYPE = {
    required: 'required',
    lessThan: 'lessThan',
    greaterThan: 'greaterThan',
    exist: 'exist',
    max: 'max',
    min: 'min',
    pattern: 'pattern',
    file: 'file',
    taxCode: 'taxCode',
    special_character_full: 'special_character_full',
    minLength: 'minLength',
    checkExist: 'checkExist'
}

export const PATTERN_MESSAGE = {
    NUMBER: 'lớn hơn 0',
    VIETNAMESE_NOT_SPACE: 'Vui lòng nhập tiếng Việt không dấu',
    PHONE: 'Vui lòng nhập số điện thoại hợp lệ (9-12 chữ số)'
}

const validateTin10 = (tin) => {
    if (tin === "" || isNaN(tin)) {
        return false
    }
    const t1 = parseInt(tin.substring(0, 1)) * 31
    const t2 = parseInt(tin.substring(1, 2)) * 29
    const t3 = parseInt(tin.substring(2, 3)) * 23
    const t4 = parseInt(tin.substring(3, 4)) * 19
    const t5 = parseInt(tin.substring(4, 5)) * 17
    const t6 = parseInt(tin.substring(5, 6)) * 13
    const t7 = parseInt(tin.substring(6, 7)) * 7
    const t8 = parseInt(tin.substring(7, 8)) * 5
    const t9 = parseInt(tin.substring(8, 9)) * 3
    const t10 = parseInt(tin.substring(9, 10))
    const T = t1 + t2 + t3 + t4 + t5 + t6 + t7 + t8 + t9
    const TT = T % 11
    const TTT = 10 - TT

    return t10 === TTT
}


export const FunctionValidate = (type, cross) => {
    const _function = {
        [ERROR_TYPE.lessThan]: (value) => {
            if (value !== null && cross !== null) {
                if (new Date(value).getTime() < new Date(cross).getTime()) {
                    return false
                }
            }
            return true
        },
        [ERROR_TYPE.greaterThan]: (value) => {
            if (value !== null && cross !== null) {
                if (new Date(value).getTime() > new Date(cross).getTime()) {
                    return false
                }
            }
            return true
        },
        [ERROR_TYPE.exist]: async (value) => {
            if (value) {
                const {payload} = await cross(value)
                if (payload?.errorCode === 'RECORD_EXISTED') {
                    return false
                }
            }
            return true
        },
        [ERROR_TYPE.file]: value => {
            if (value) {
                // if (!value instanceof File) {
                //     throw new Error('value.not.instanceof.File')
                // }
                // maxSize: Mb
                // acceptFiles is array
                // console.log('aaaaaaa', value)
                const {acceptFiles, maxSize} = cross
                if (acceptFiles && !acceptFiles.some(extension => value.recordName.toLowerCase().endsWith(extension))) {
                    return 'Vui lòng chọn file đúng định dạng'
                }
                if (value.fileSize <= 0) {
                    return 'File dữ liệu không hợp lệ !'
                }
                if (maxSize && value.fileSize > maxSize * 1024 * 1024) {
                    return `Vui lòng chọn file kích thước nhỏ hơn ${maxSize}Mb`
                }
            }
            return true
        },
        [ERROR_TYPE.taxCode]: value => {
            if (value) {
                value = value.trim()
                if (value.length !== 10 && value.length !== 14) {
                    return false
                }
                if (value.length === 10) {
                    if (!validateTin10(value)) return 'Mã số thuế sai định dạng'
                    else return validateTin10(value)
                }
                if (value.length === 14) {
                    const tintin = value.split("-")
                    return !(tintin.length <= 1 || tintin.length > 2) && !isNaN(tintin[1]) && validateTin10(tintin[0])
                }
            }
            return true
        },
        [ERROR_TYPE.special_character_full]: value => {
            let specialChars = "<>@!#$%^&*()_+[]{}?:;|\"\\,./~“”‘'’`-="
            const specialChars_ = '"'
            if (cross) {
                for (let i = 0; i < cross.length; i++) {
                    specialChars = specialChars.replace(cross[i], '')
                }
            }
            for (let i = 0; i < specialChars.length; i++) {
                if (value.indexOf(specialChars[i]) > -1) {
                    return false
                }
            }
            for (let i = 0; i < specialChars_.length; i++) {
                if (value.indexOf(specialChars_[i]) > -1) {
                    return false
                }
            }
            return true
        }
    }
    const res = {}
    Array.isArray(type) ? type.forEach(e => {
        res[e] = _function[e]
    }) : res[type] = _function[type]
    return res
}


export const ValidateFeedback = ({label, crossLabel, error}) => {
    const renderFeedback = useCallback((label, crossLabel, error) => {
        console.log('aaaa', error)
        switch (error['type']) {
            case ERROR_TYPE.required:
                return `Vui lòng nhập ${label}`
            case ERROR_TYPE.lessThan:
                return `${label} không nhỏ hơn ${crossLabel.charAt(0).toLowerCase() + crossLabel.slice(1)}`
            case ERROR_TYPE.greaterThan:
                return `${label} không lớn hơn ${crossLabel.charAt(0).toLowerCase() + crossLabel.slice(1)}`
            case ERROR_TYPE.exist:
                return `${label} đã tồn tại. Vui lòng nhập lại`
            case ERROR_TYPE.file:
            case ERROR_TYPE.pattern:
            case ERROR_TYPE.max:
            case ERROR_TYPE.min:
            case ERROR_TYPE.minLength:
                return crossLabel
            case ERROR_TYPE.checkExist:
                return crossLabel
            case ERROR_TYPE.taxCode:
                return `Vui lòng nhập MST hợp lệ:(10 số: xxxxxxxxxx) hoặc (13 số xxxxxxxxxx-xxx)`
            case ERROR_TYPE.special_character_full:
                return `${label} chứa kí tự không hợp lệ`
            default:
                throw new Error(`Cannot find type error: ${error.type}`)
        }
    }, [])

    return ((!!error && Object.keys(error).length > 0)
        && <FormFeedback className="position-absolute">{renderFeedback(label, crossLabel, error)}</FormFeedback>)
}

ValidateFeedback.propTypes = {
    label: PropTypes.string.isRequired,
    error: PropTypes.object.isRequired,
    crossLabel: PropTypes.string
}

ValidateFeedback.defaultProps = {
    error: {},
    label: ''
}
