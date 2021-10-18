
export const findAllUser = formValues => ({
    method: 'POST',
    endpoint: '/user/admin/get-list-user',
    body: formValues
})
