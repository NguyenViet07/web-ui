
export const loginAction = formValues => ({
    method: 'POST',
    endpoint: '/auth/login',
    body: formValues
})
