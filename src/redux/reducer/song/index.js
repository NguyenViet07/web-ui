import {SONG_VALUE} from "../../../untility/const/SongConstant";

const initialState = {
    songValue: null
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
        default:
            return state
    }
}

export default song
