
export const createAlbum = formValues => ({
    method: 'POST',
    endpoint: '/album/all-user/create',
    body: formValues
})

export const deleteAlbum = formValues => ({
    method: 'POST',
    endpoint: '/album/all-user/delete',
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

export const getListAlbum = () => ({
    method: 'GET',
    endpoint: '/album/get-list'
})

export const infoAlbum = formValues => ({
    method: 'POST',
    endpoint: '/album/get-info',
    body: formValues
})
