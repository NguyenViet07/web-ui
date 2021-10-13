
export const loginAction = formValues => ({
    method: 'POST',
    endpoint: '/auth/login',
    body: formValues
})

export const logoutAction = () => ({
    method: 'GET',
    endpoint: `/auth/logout`
})
