
export const creatUser = formValues => ({
    method: 'POST',
    endpoint: '/user/create',
    body: formValues
})

export const findByUserName = formValues => ({
    method: 'POST',
    endpoint: '/user/all-user/info',
    body: formValues
})
