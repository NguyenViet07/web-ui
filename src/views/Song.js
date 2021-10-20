import React, {useEffect, useState} from "react";
// import sections
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {useParams} from 'react-router-dom';
import {useMutation} from "react-fetching-library";
import {Card, CardHeader, CardText, CardSubtitle, CardBody, CardTitle, Row, Col, Label} from 'reactstrap'
import {findBySongId} from "../api/actions/song";
import {toast} from "react-toastify";

const Song = () => {

    const songId = useParams().id

    const [url, setUrl] = useState('')
    const [songInfo, setSongInfo] = useState(null)

    const {mutate: _findBySongId} = useMutation(findBySongId)

    useEffect(async () => {

        if (songId) {
            const data = {
                songId: songId,
            }

            const response = await _findBySongId(data)
            if (response.payload?.errorCode === '200') {
                setUrl(response.payload.data.url)
                setSongInfo(response.payload.data)
            } else {
                toast.error(response.payload?.message)
            }

        }

    }, [])

    return (
        <div style={{ margin: "10%", width: "80%" }}>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">{songInfo.songName}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{songInfo.songName}</CardSubtitle>
                </CardBody>
                <img width="100%" src="/imgs/image.jpg" alt="Card image cap" />
                <AudioPlayer
                    autoPlay
                    src={`http://localhost:9000/api/v1/song/download?url=${url}`}
                    onPlay={(e) => console.log("onPlay")}
                />
                <CardBody>
                    <CardText>{songInfo.description}</CardText>
                </CardBody>
            </Card>
            {/*<AudioPlayer*/}
            {/*    autoPlay*/}
            {/*    src={`http://localhost:9000/api/v1/song/download?url=${url}`}*/}
            {/*    onPlay={(e) => console.log("onPlay")}*/}
            {/*/>*/}
        </div>
    );
};

export default Song;
