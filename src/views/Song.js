import React, {useEffect, useState} from "react";
// import sections
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {useParams} from 'react-router-dom';
import {useMutation} from "react-fetching-library";
import {Card, CardHeader, CardText, CardSubtitle, CardBody, CardTitle, Row, Col, Label} from 'reactstrap'
import {findBySongId} from "../api/actions/song";
import {toast} from "react-toastify";
import {Lock, ThumbsUp} from "react-feather";
import {createLike, deleteLike} from "../api/actions/like";

const Song = () => {

    const songId = useParams().id

    const [url, setUrl] = useState('')
    const [urlTest, setUrlTest] = useState('')
    const [songInfo, setSongInfo] = useState(null)

    const [checkLike, setCheckLike] = useState(false)

    const {mutate: _findBySongId} = useMutation(findBySongId)
    const {mutate: _createLike} = useMutation(createLike)
    const {mutate: _deleteLike} = useMutation(deleteLike)

    const like = async () => {
        const response = checkLike ? await _deleteLike({songId: songId}) : await _createLike({songId: songId})
        if (response.payload?.errorCode === '200') {
            setCheckLike(!checkLike)
        } else {
            toast.error(response.payload?.message)
        }
    }

    useEffect(async () => {

        setUrlTest('https://hanzluo.s3-us-west-1.amazonaws.com/music/yonghengdegangwan.mp3')

        if (songId) {
            const data = {
                songId: songId,
            }

            const response = await _findBySongId(data)
            if (response.payload?.errorCode === '200') {
                const linkUrlSong = response.payload.data.url
                setUrl(`http://localhost:9000/api/v1/song/download?url=${linkUrlSong}`)
                const res = response.payload.data
                setSongInfo(res)
                if (res.like === 1) {
                    setCheckLike(true)
                } else setCheckLike(false)
            } else {
                toast.error(response.payload?.message)
            }

        }

    }, [])

    return (
        <div style={{ margin: "10%", width: "80%" }}>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">{songInfo?.songName}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{songInfo?.songName}</CardSubtitle>
                </CardBody>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '180px', margin: '0 auto'}}>
                    <img style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}} src="/imgs/image.jpg" alt="Card image cap" />
                </div>
                <AudioPlayer
                    autoPlay
                    src={url}
                    // src={urlTest}
                    onPlay={(e) => console.log("onPlay")}
                    autoPlayAfterSrcChange={true}
                    showSkipControls={true}
                    showJumpControls={false}
                />
                <CardBody>
                    <CardText>{songInfo?.description}</CardText>
                    <div title={'mở khóa/khóa'}>
                        {
                            checkLike ?
                                <ThumbsUp onClick={() => like()} style={{cursor: 'pointer', color: '#1200ff'}}/> :
                                <ThumbsUp onClick={() => like()} style={{cursor: 'pointer', color: '#6e6b7b'}}/>
                        }
                    </div>
                </CardBody>
            </Card>
        </div>
        // <>
        //     <AudioPlayer
        //         src={urlTest}
        //     />
        // </>
    );
};

export default Song;
