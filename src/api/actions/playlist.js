
export const createPlaylist = formValues => ({
    method: 'POST',
    endpoint: '/playlist/singer/create',
    body: formValues
})

