import Flatpickr from "react-flatpickr"
import * as classnames from "classnames"
import {Controller} from "react-hook-form"
import React, {useEffect, useRef, useState} from "react"
import {Vietnamese} from "flatpickr/dist/l10n/vn"
import Proptypes from "prop-types"
import {Calendar} from "react-feather"

export const DatePicker = ({rules, control, error, classError, opt, name, readOnly, enableTime = false, ...props}) => {

    const [hiddenClear, setHiddenClear] = useState(true)

    const refPickr = useRef(null)

    const handleDatePicker = (value, onChange) => {
        if (opt?.mode === 'range') {
            if (value?.length === 2) {
                setHiddenClear(false)
            } else setHiddenClear(true)
        } else setHiddenClear(value?.length === 0)
        if (!value || value.length === 0) {
            onChange(null)
            return
        }
        if (opt?.mode !== 'range') {
            onChange(value[0])
            return
        }
        // Bỏ qua lần select fromDate
        if (value.length === 2) {
            // fromdate phai tu 00h00p00s
            // todate phai den 23h59p59s
            const fromDate = new Date(Date.parse(value[0]))
            const toDate = new Date(Date.parse(value[1]) + 86399000) // 23h59p59s
            onChange([fromDate, toDate])
        }
    }

    useEffect(() => {
        refPickr.current.flatpickr.input.disabled = readOnly
    }, [readOnly])

    const toggle = () => {
        refPickr.current.flatpickr.open()
    }

    const clear = (onChange) => {
        onChange(null)
        setHiddenClear(true)
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            onFocus={() => refPickr.current.node.focus()}
            render={({onChange, onBlur, ...propsRender}) => (
                <div className={classnames('datepicker', {'is-invalid': error}, classError)}>
                    <Flatpickr
                        id={name}
                        {...propsRender}
                        ref={refPickr}
                        options={{
                            locale: Vietnamese,
                            mode: 'single',
                            disableMobile: "true",
                            ...enableTime && {
                                defaultHour: 0,
                                time_24hr: true,
                                enableTime: true,
                                minuteIncrement: 1,
                                enableSeconds: true
                            },
                            dateFormat: enableTime ? 'd-m-Y H:i:S' : 'd-m-Y',
                            onClose: () => {
                                setTimeout(() => setHiddenClear(true), 250)
                            },
                            onOpen: () => {
                                setHiddenClear(false)
                            },
                            ...opt
                        }}
                        onChange={(value) => {
                            handleDatePicker(value, onChange)
                        }}
                        className={classnames('flatpickr', 'form-control', {'is-invalid': error}, classError)}
                        {...opt?.mode === 'range' ? {placeholder: 'Từ ngày - Đến ngày'} : {}}
                        {...props}
                    />
                    {!hiddenClear &&
                    <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false"
                         onClick={() => clear(onChange)}
                         className="css-tj5bde-Svg calendar" style={{right: '44px', width: '20px', height: '20px'}}>
                        <path
                            d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                    </svg>}
                    <Calendar className={classnames('calendar', {readonly: readOnly})} size={18} onClick={toggle}/>
                </div>
            )}
        />
    )
}

DatePicker.propTypes = {
    control: Proptypes.any.isRequired,
    name: Proptypes.string.isRequired,
    opt: Proptypes.object,
    rules: Proptypes.any,
    classError: Proptypes.any
}

DatePicker.defaultProps = {
    rules: null
}
