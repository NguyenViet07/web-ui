
export const createSong = formValues => ({
    method: 'POST',
    endpoint: '/song/singer/create-song',
    body: formValues
})

export const addSongToAlbum = formValues => ({
    method: 'POST',
    endpoint: '/song/singer/add-album',
    body: formValues
})

export const addSongToPlayList = formValues => ({
    method: 'POST',
    endpoint: '/song/singer/add-playlist',
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

export const upView = formValues => ({
    method: 'POST',
    endpoint: '/song/up-view',
    body: formValues
})


export const getListSongCreated = () => ({
    method: 'GET',
    endpoint: '/song/list-created'
})

export const getListSongView = () => ({
    method: 'GET',
    endpoint: '/song/list-view'
})


