
export const createLike = formValues => ({
    method: 'POST',
    endpoint: '/like/create-song',
    body: formValues
})

export const deleteLike = formValues => ({
    method: 'POST',
    endpoint: '/like/delete-list',
    body: formValues
})




