import React, {useEffect} from "react";
import { useState } from "react";
// import sections
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, CardImg,
} from "reactstrap";
import {toast} from "react-toastify";
import {getDataSongValue} from "../../redux/action/song";
import {useDispatch, useSelector} from "react-redux"
import {useMutation} from "react-fetching-library";
import {getListSongCreated, upView} from "../../api/actions/song";
import {createLike, deleteLike} from "../../api/actions/like";
import {ThumbsUp} from "react-feather";

const RightSidebar = () => {
  const playlist = [
    {
      name: "Bài gì đây 1",
      author: "ongtt",
      src: "https://hanzluo.s3-us-west-1.amazonaws.com/music/zhiya.mp3",
    },
    {
      name: "Bài gì đây 2",
      author: "ongtt",
      src: "https://hanzluo.s3-us-west-1.amazonaws.com/music/ziyounvshen.mp3",
    },
    {
      name: "Bài gì đây 3",
      author: "ongtt",
      src: "https://hanzluo.s3-us-west-1.amazonaws.com/music/wuyuwuqing.mp3",
    },
    {
      name: "Bài gì đây 4",
      author: "ongtt",
      src: "https://hanzluo.s3-us-west-1.amazonaws.com/music/suipian.mp3",
    },
    {
      name: "Bài gì đây 5",
      author: "ongtt",
      src: "https://hanzluo.s3-us-west-1.amazonaws.com/music/yonghengdegangwan.mp3",
    },
  ];

  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);

  const handleClickPrevious = () => {
    setCurrentMusicIndex((prevState) => {
      return prevState === 0 ? playlist.length - 1 : prevState - 1;
    });
  };

  const handleClickNext = () => {
    setCurrentMusicIndex((prevState) => {
      return prevState < playlist.length - 1 ? prevState + 1 : 0;
    });
  };
  const onSongClick = (index) => {
    setCurrentMusicIndex(index);
  };

  const {mutate: _upView} = useMutation(upView)
  const {mutate: _createLike} = useMutation(createLike)
  const {mutate: _deleteLike} = useMutation(deleteLike)


  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('')
  const [checkLike, setCheckLike] = useState(false)

  const toggle = () => setIsOpen(!isOpen);

  const dispatch = useDispatch()
  const songValue = useSelector((state) => state.song.songValue);



  const like = async () => {
    const response = checkLike ? await _deleteLike({songId: songValue.songId}) : await _createLike({songId: songValue.songId})
    if (response.payload?.errorCode === '200') {
      setCheckLike(!checkLike)
    } else {
      toast.error(response.payload?.message)
    }
  }

  const upViewSong = async () => {
    await _upView({songId: songValue.songId})
  };

  useEffect( () => {

    console.log('aaaaaaa', songValue)
  }, [])

  useEffect(() => {
    console.log('product', songValue)
    setUrl(`http://localhost:9000/api/v1/song/download?url=${songValue?.link}`)
  }, [songValue])

  return (
    <div className="sc-7s83t7-1 ifOydT  ">
      <div className="sc-7s83t7-2 drAQLJ">
        <div className="sc-1qbj5ru-0 ebwIPv">
          <div className="sc-16rq4d2-1 jvTHpy">
            <div className="sc-16rq4d2-2 gVzVPL">
              <div>
                <div className="hkf419-0 djVTep sc-16rq4d2-8 GuhPz">
                  <div className="h5pibw-0 kHigLB">
                    <div className="h5pibw-2 beUHDP ongtt-check">
                      {
                        songValue?.image ? <img
                                className="antedm-1 fZPioS"
                                src={songValue.image}
                                alt=""
                            /> :
                            <img
                                className="antedm-1 fZPioS"
                                src='/imgs/pika.jpg'
                                alt=""
                            />
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div class="sc-16rq4d2-3 cNMrYa w3-row">
                <div class="w3-col group-left">
                  <div class="sc-16rq4d2-4 ifpCqr">
                    <div class="sc-16rq4d2-5 bMVqpF __3dot-content">
                      <a href="/bai-hat/la-qua-b-ray-ft-karik.58Dq1zUiu9uN.html">
                        {songValue?.songName}
                      </a>
                    </div>
                  </div>
                  <h5 class="sc-1t0c993-2 KmQyo sc-16rq4d2-0 lcHdEu __3dot-content">
                    <span title="B Ray" class="sc-1t0c993-0 gJpHzO">
                      B Ray
                    </span>
                    <span class="sc-1t0c993-1 ifhmLj">,&nbsp;</span>
                    <span title="Karik" class="sc-1t0c993-0 gJpHzO">
                      Karik
                    </span>
                  </h5>
                </div>
                <div>
                  {
                    checkLike ?
                        <ThumbsUp onClick={() => like()} style={{cursor: 'pointer', color: '#1200ff'}}/> :
                        <ThumbsUp onClick={() => like()} style={{cursor: 'pointer', color: '#6e6b7b'}}/>
                  }
                </div>
                <div class="w3-col group-right">
                  <span
                    class="sc-16rq4d2-11 ivHpzf ic heard ic_heart_normal"
                    title="Yêu thích bài hát"
                    hidden=""
                  >{songValue?.description}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="sc-7s83t7-3 eFEVLi">
            <div className="d-flex justify-content-between mb-3">
              <div class="sc-1upgf6e-1 cyXUeA">
                <div class="sc-1upgf6e-0 hQhNXy">Danh sách phát</div>
              </div>
              <div class="sc-7s83t7-0 cZPbyp">
                <div class="jss25">
                  <div>
                    <div
                      class="sc-1h4f6p9-0 iQLiGW"
                      name="ic_more_vertical"
                      size="18"
                    >
                      <ButtonDropdown
                        className="MuiButtonBase-root MuiIconButton-root jss30"
                        isOpen={isOpen}
                        toggle={toggle}
                      >
                        <DropdownToggle>
                          <span class="MuiIconButton-label">
                            <span class="sc-1h4f6p9-1 kRuzxG ic_more_vertical"></span>
                          </span>
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem>Thêm vào playlist</DropdownItem>
                          <DropdownItem>Chia sẻ</DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <AudioPlayer
              autoPlay
              onPlay={(e) => {upViewSong()}}
              onEnded={(e) => handleClickNext()}
              autoPlayAfterSrcChange={true}
              showSkipControls={true}
              showJumpControls={false}
              src={url}
              onClickPrevious={() => {
                handleClickPrevious();
              }}
              onClickNext={() => {
                handleClickNext();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
