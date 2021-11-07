
export const createAlbum = formValues => ({
    method: 'POST',
    endpoint: '/album/singer/create',
    body: formValues
})

