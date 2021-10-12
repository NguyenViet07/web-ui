import {Fragment} from "react"

export const ValidateMessage = ({message, ...props}) => {
    return (
        <Fragment>
            {!!message && <div style={{position: 'absolute', color: '#ea5455', marginTop: '0.25rem', fontSize: '0.857rem'}}>
                {message}
            </div>}
        </Fragment>
    )
}
export default ValidateMessage
