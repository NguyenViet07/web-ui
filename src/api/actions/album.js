
export const createAlbum = formValues => ({
    method: 'POST',
    endpoint: '/album/all-user/create',
    body: formValues
})

export const getListMyAlbum = formValues => ({
    method: 'POST',
    endpoint: '/album/all-user/get-list',
    body: formValues
})

export const getInfoAlbum = formValues => ({
    method: 'POST',
    endpoint: '/album/all-user/get-info',
    body: formValues
})
