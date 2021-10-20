
export const createSong = formValues => ({
    method: 'POST',
    endpoint: '/song/singer/create-song',
    body: formValues
})

export const getListSongByUserId = formValues => ({
    method: 'POST',
    endpoint: '/song/singer/get-list',
    body: formValues
})

export const findBySongId = formValues => ({
    method: 'POST',
    endpoint: '/song/info',
    body: formValues
})


