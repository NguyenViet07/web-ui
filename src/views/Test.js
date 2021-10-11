import React from "react";
// import sections
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Test = () => {
  return (
    <div style={{ marginTop: "10%" }}>
      <AudioPlayer
        autoPlay
        src="/test/Yeu-La-Cuoi-Phat-Ho.mp3"
        onPlay={(e) => console.log("onPlay")}
      />
    </div>
  );
};

export default Test;
