import React from "react";
import { useState } from "react";
// import sections
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
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

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

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
                      <img
                        className="antedm-1 fZPioS"
                        src="https://avatar-ex-swe.nixcdn.com/song/2021/10/21/c/d/d/a/1634807126106_300.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="sc-16rq4d2-3 cNMrYa w3-row">
                <div class="w3-col group-left">
                  <div class="sc-16rq4d2-4 ifpCqr">
                    <div class="sc-16rq4d2-5 bMVqpF __3dot-content">
                      <a href="/bai-hat/la-qua-b-ray-ft-karik.58Dq1zUiu9uN.html">
                        Lạ Quá
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
                <div class="w3-col group-right">
                  <span
                    class="sc-16rq4d2-11 ivHpzf ic heard ic_heart_normal"
                    title="Yêu thích bài hát"
                    hidden=""
                  ></span>
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
                      {/* <button
                        class="MuiButtonBase-root MuiIconButton-root jss30"
                        tabindex="-1"
                        type="button"
                      >
                        <span class="MuiTouchRipple-root"></span>
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <AudioPlayer
              autoPlay
              onPlay={(e) => console.log("onPlay")}
              onEnded={(e) => handleClickNext()}
              autoPlayAfterSrcChange={true}
              showSkipControls={true}
              showJumpControls={false}
              src={playlist[currentMusicIndex].src}
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
