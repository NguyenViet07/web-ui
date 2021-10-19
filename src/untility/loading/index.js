import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import Spinner from "reactstrap/es/Spinner"

const Loading = ({styleParent, msg}) => {
    Loading.propTypes = {
        styleParent: PropTypes.any
    }
    const refLoading = useRef(null)
    const styleLocal = {
        display: 'flex',
        position: 'absolute',
        zIndex: 657,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        margin: '0px',
        inset: '0px'
    }
    useEffect(() => {
        refLoading.current.parentElement.classList.add('parent-element-position-relative')
    }, [])
    return (
        <div ref={refLoading} style={{...styleLocal, ...styleParent}}>
            <div className="el-loading-spinner" style={{left: '0px', color: '#7367f0'}}>
                <div style={{marginLeft: '50%'}}>
                    <Spinner/>
                </div>
                {
                    msg && <p>{msg}</p>
                }
            </div>
        </div>
    )
}

export default Loading

