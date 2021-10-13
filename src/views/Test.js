import React from "react";
import { useState } from "react";
// import sections
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import RandomSong from "../components/elements/RandomSong";
const Test = () => {
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
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-9 detail_lyric_1">
          <div className="d-flex justify-content-between mb-3 box1 music-listen-title">
            <h1 className="title">{playlist[currentMusicIndex].name}</h1>
          </div>
          <div>
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

            <div className="music_recommendation">
              <div className="d-table">
                {playlist &&
                  playlist.map((data, i) => (
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
                      <div className="author d-table-cell">
                        <div className="author-ellepsis">
                          <span>{data.author}</span>
                        </div>
                      </div>
                      <div className="tool d-table-cell text-right">
                        <span>100 lượt nghe</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-4">
              <div id="companion_cover">
                <img
                  src="https://data.chiasenhac.com/data/cover/147/146277.jpg"
                  alt=""
                  className="w-100 card-img-top"
                />
              </div>
            </div>
            <div className="col-md-8">
              <div class="d-flex justify-content-between mb-3">
                <div class="title2">
                  Đóng góp:{" "}
                  <span class="author">
                    <a target="_blank" href="/user/1052254">
                      bodienn97
                    </a>
                  </span>{" "}
                </div>
                <div></div>
              </div>
              <div class="card-body pl-0">
                <h2 class="card-title">Tình Thương Phu Thê</h2>
                <ul class="list-unstyled">
                  <li>
                    <span>Ca sĩ: </span>
                    <a href="/ca-si/chi-huong-zssm7b0cq8tqnv.html">Chí Hướng</a>
                  </li>{" "}
                  <li>
                    <span>Sáng tác: </span>
                    <a href="/tim-kiem?q=Chí Hướng&amp;filter=sang-tac">
                      Chí Hướng
                    </a>
                  </li>{" "}
                  <li>
                    <span>Album: </span>
                    <a href="/nghe-album/tinh-thuong-phu-the-single-xss6qbs6qkeq4k.html">
                      Tình Thương Phu Thê (Single)
                    </a>
                  </li>{" "}
                  <li>
                    <span>Năm phát hành: </span>2021
                  </li>{" "}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <RandomSong />
        </div>
      </div>
    </div>
  );
};

export default Test;
