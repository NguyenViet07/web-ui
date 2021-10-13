import React from "react";
import { useState } from "react";
// import sections
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
const Test = () => {
  const playlist = [
    {
      name: "枝芽",
      src: "https://hanzluo.s3-us-west-1.amazonaws.com/music/zhiya.mp3",
    },
    {
      name: "自由女神",
      src: "https://hanzluo.s3-us-west-1.amazonaws.com/music/ziyounvshen.mp3",
    },
    {
      name: "无雨无晴",
      src: "https://hanzluo.s3-us-west-1.amazonaws.com/music/wuyuwuqing.mp3",
    },
    {
      name: "碎片",
      src: "https://hanzluo.s3-us-west-1.amazonaws.com/music/suipian.mp3",
    },
    {
      name: "永恒的港湾",
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
    <div style={{ marginTop: "10%" }}>
      <p>currentMusicIndex: {currentMusicIndex}</p>
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
      <div>
        {playlist &&
          playlist.map((data, i) => (
            <p
              key={i}
              className="song-item"
              onClick={() => {
                onSongClick(i);
              }}
            >
              {data.name}
            </p>
          ))}
      </div>
    </div>
  );
};

export default Test;
