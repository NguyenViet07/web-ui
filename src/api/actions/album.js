
export const createAlbum = formValues => ({
    method: 'POST',
    endpoint: '/album/all-user/create',
    body: formValues
})

