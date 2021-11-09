
export const createLike = formValues => ({
    method: 'POST',
    endpoint: '/like/all-user/create-song',
    body: formValues
})

export const deleteLike = formValues => ({
    method: 'POST',
    endpoint: '/like/all-user/delete-list',
    body: formValues
})




