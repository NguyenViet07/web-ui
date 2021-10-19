
export const findAllUser = formValues => ({
    method: 'POST',
    endpoint: '/user/admin/get-list-user',
    body: formValues
})

export const activeUser = formValues => ({
    method: 'POST',
    endpoint: '/user/admin/active-user',
    body: formValues
})
