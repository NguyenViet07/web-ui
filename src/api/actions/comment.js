
export const getListComment = formValues => ({
    method: 'POST',
    endpoint: '/comment/get-list-song',
    body: formValues
})

export const createComment = formValues => ({
    method: 'POST',
    endpoint: '/comment/all-user/create-song',
    body: formValues
})

// export const deleteLike = formValues => ({
//     method: 'POST',
//     endpoint: '/like/all-user/delete-list',
//     body: formValues
// })




