import React, {useEffect} from "react";
import { useState } from "react";
// import sections
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import RandomSong from "../components/elements/RandomSong";
import {useParams} from "react-router-dom";
import {useMutation} from "react-fetching-library";
import {findBySongId, getListSongByStyle} from "../api/actions/song";
import {infoAlbum} from "../api/actions/album";
import {toast} from "react-toastify";
const StyleSongInfo = () => {

  const style = useParams().id

  const {mutate: _getListSongByStyle} = useMutation(getListSongByStyle)

  const [listSong, setListSong] = useState([])

  const [albumInfo, setAlbumInfo] = useState(null)

  const [albumSinger, setAlbumSinger] = useState(null)

  const listTyple = [
    {value: 1, label: 'POP', image: 'https://avatar-ex-swe.nixcdn.com/playlist/2019/10/20/6/3/4/2/1571561940569_300.jpg'},
    {value: 2, label: 'Rock', image: 'https://avatar-ex-swe.nixcdn.com/playlist/2019/10/20/6/3/4/2/1571561940569_300.jpg'},
    {value: 3, label: 'Jazz', image: 'https://avatar-ex-swe.nixcdn.com/playlist/2019/10/20/6/3/4/2/1571561940569_300.jpg'},
    {value: 4, label: 'POP', image: 'https://avatar-ex-swe.nixcdn.com/playlist/2019/10/20/6/3/4/2/1571561940569_300.jpg'},
    {value: 5, label: 'Nhạc trữ tình', image: 'https://avatar-ex-swe.nixcdn.com/playlist/2019/10/20/6/3/4/2/1571561940569_300.jpg'},
    {value: 6, label: 'Nhạc cách mạng', image: 'https://avatar-ex-swe.nixcdn.com/playlist/2019/10/20/6/3/4/2/1571561940569_300.jpg'},
    {value: 7, label: 'Khác', image: 'https://avatar-ex-swe.nixcdn.com/playlist/2019/10/20/6/3/4/2/1571561940569_300.jpg'}
  ]

  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);

  const handleClickPrevious = () => {
    setCurrentMusicIndex((prevState) => {
      return prevState === 0 ? listSong.length - 1 : prevState - 1;
    });
  };

  const handleClickNext = () => {
    setCurrentMusicIndex((prevState) => {
      return prevState < listSong.length - 1 ? prevState + 1 : 0;
    });
  };
  const onSongClick = (index) => {
    setCurrentMusicIndex(index);
  };

  useEffect(async () => {

    if (style) {
      const data = {
        style: style,
      }
       let songList = [];

      const response = await _getListSongByStyle(data)
      if (response.payload?.errorCode === '200') {
        const options = response?.payload?.data?.map(el => ({
          name: el.songName,
          src: `http://localhost:9000/api/v1/song/download?url=${el.link}`,
          view: el.views
        }))

        // songList.map()

        setListSong(options)
      } else {
        toast.error(response.payload?.message)
      }

    }


  }, [])

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-9 detail_lyric_1">

          <div className="row mt-4">
            <div className="col-md-4">
              <div id="companion_cover">
                <img
                    src={listTyple[style - 1].image}
                    className="w-100 card-img-top"
                />
              </div>
            </div>
            <div className="d-flex justify-content-between mb-3 box1 music-listen-title">
              <h1 className="title">Thể loại nhạc: {listTyple[style-1].label}</h1>
            </div>
          </div>

          {
            listSong.length > 0 ? <div>
              <AudioPlayer
                  autoPlay
                  onPlay={(e) => console.log("onPlay")}
                  onEnded={(e) => handleClickNext()}
                  autoPlayAfterSrcChange={true}
                  showSkipControls={true}
                  showJumpControls={false}
                  src={listSong[currentMusicIndex].src}
                  onClickPrevious={() => {
                    handleClickPrevious();
                  }}
                  onClickNext={() => {
                    handleClickNext();
                  }}
              />

              <div className="music_recommendation">
                <div className="d-table">
                  {listSong &&
                  listSong.map((data, i) => (
                      <div
                          className={`card-footer ${
                              currentMusicIndex === i ? "active" : ""
                          }`}
                          onClick={() => {
                            onSongClick(i);
                          }}
                      >
                        <div className="name d-table-cell">
                        <span>
                          {i + 1}. {data.name}
                        </span>
                        </div>
                        <div className="tool d-table-cell text-right">
                          <span>{data.view} lượt nghe</span>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div> : <span> Danh sách bài hát đang trống, bạn hãy quay lại sau nhé</span>

          }
        </div>
        <div className="col-md-3">
          <RandomSong />
        </div>
      </div>
    </div>
  );
};

export default StyleSongInfo;
