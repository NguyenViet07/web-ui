// import confirm from "../../views/common/confirm-dialog"

const ERROR_AUTH = [
    "ERROR_UNAUTHORIZED",
    "ERR_EXPIRED_TOKEN",
    "ERR_ACCESS_DENIED",
    "ERR_INVALID_TOKEN",
    "ERR_TOKEN_NOT_SUPPORT",
    "ERR_TOKEN_EMPTY",
    "ERR_ACCESS_DENIED"
]

export const responseInterceptor = () => async (action, response) => {

    const code = response?.payload?.errorCode
    if (ERROR_AUTH.includes(code)) {
        const token = localStorage.getItem('token')
        localStorage.removeItem('userData')
        localStorage.removeItem('token')
        localStorage.setItem('current-url', window.location.pathname)
        // if (token) {
        //     await confirm({
        //         options: {
        //             title: 'Cảnh báo',
        //             text: 'Phiên làm việc hết hạn, xin vui lòng đăng nhập lại.',
        //             confirmButtonText: 'Đồng ý',
        //             showCancelButton: false,
        //             showCloseButton: false,
        //             btnPosition: 'center',
        //             type: 'warning'
        //         }
        //     })
        // }
        window.location.replace(`${window.env.ROOT_PATH}/dang-nhap`)
    }
    return response
}
