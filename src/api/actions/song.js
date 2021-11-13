
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

export const deleteSong = formValues => ({
    method: 'POST',
    endpoint: '/song/singer/delete',
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

export const getListSongByLike = () => ({
    method: 'GET',
    endpoint: '/song/list-like'
})

export const getSongNewCreated = () => ({
    method: 'GET',
    endpoint: '/song/new-created'
})

export const getListSongByComment = () => ({
    method: 'GET',
    endpoint: '/song/list-comment'
})

export const getListSongByStyle = formValues => ({
    method: 'POST',
    endpoint: '/song/list-style',
    body: formValues
})

export const getListMySongByLike = () => ({
    method: 'GET',
    endpoint: '/song/singer/list-my-like',
})



