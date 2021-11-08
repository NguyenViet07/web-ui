
export const createPlaylist = formValues => ({
    method: 'POST',
    endpoint: '/playlist/singer/create',
    body: formValues
})

export const getListMyPlaylist = formValues => ({
    method: 'POST',
    endpoint: '/playlist/all-user/get-list',
    body: formValues
})
