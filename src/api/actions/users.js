
export const creatUser = formValues => ({
    method: 'POST',
    endpoint: '/user/create',
    body: formValues
})
