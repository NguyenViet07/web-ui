import React, {useEffect, useState} from "react";
// import sections
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {useParams} from 'react-router-dom';
import {useMutation} from "react-fetching-library";
import {findByUserName} from "../api/actions/users";
import {findBySongId} from "../api/actions/song";
import {toast} from "react-toastify";

const Song = () => {

    const songId = useParams().id

    const [url, setUrl] = useState('')

    const {mutate: _findBySongId} = useMutation(findBySongId)

    useEffect(async () => {

        if (songId) {
            const data = {
                songId: songId,
            }

            const response = await _findBySongId(data)
            if (response.payload?.errorCode === '200') {
                console.log('response', response.payload.data.url)
                setUrl(response.payload.data.url)
            } else {
                toast.error(response.payload?.message)
            }

        }

    }, [])

    return (
        <div style={{ marginTop: "10%" }}>
            <AudioPlayer
                autoPlay
                src={`http://localhost:9000/api/v1/song/download?url=${url}`}
                onPlay={(e) => console.log("onPlay")}
            />
        </div>
    );
};

export default Song;
