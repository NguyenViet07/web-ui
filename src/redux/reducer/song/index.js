import {SONG_VALUE, USER_NAME} from "../../../untility/const/SongConstant";

const initialState = {
    songValue: null,
    userName: null
}

const song = (state = initialState, action) => {
    const {payload} = action
    console.log('dispatch', action)
    switch (action.type) {
        case SONG_VALUE:
            return {
                ...state,
                songValue: action.data
            }
        case USER_NAME:
            return {
                ...state,
                userName: action.data
            }
        default:
            return state
    }
}

export default song
