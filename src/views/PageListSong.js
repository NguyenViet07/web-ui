import React from "react";
import { useState } from "react";
// import sections
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import RandomSong from "../components/elements/RandomSong";
import SongItem from "../components/elements/SongItem";
import Album from "../components/homes/Album";

const PageTestSong = () => {
  return (
    <div className="p-4">
      <div className="row">
        <div className="col-md-3">
          <div className="h5pibw-2 p-4 pt-0 ">
            <img
              className="antedm-1 fZPioS"
              src="https://avatar-ex-swe.nixcdn.com/song/2021/10/21/c/d/d/a/1634807126106_300.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="col-md-9">
          <div>
            <div class="sc-jEKYNM bdIIfT">
              <span class="sc-dYTRRX krDxsF">Tên:</span>
              <span class="sc-hxPjim iJtgKn"> Fresh &amp; Chill</span>
            </div>
            <div class="sc-bLPcC ixRSYj w3-row">
              <div class="sc-mfyeg cHbucU w3-rest">25/10/2021</div>
            </div>
            <div class="sc-gjtWyx idAWVU">
              Cùng khám phá làn gió mới tươi mát từ những ca khúc mới ra mắt
            </div>
          </div>
        </div>
        <div className="chWPSK">
          <div class="sc-dNvYHJ bwIDZC w3-col">
            <div class="sc-lkKZoo kqVftK">Tạo bởi:</div>
            <div class="sc-gpQvLH gOzSIw __3dot-content">Goodmusic4baddays</div>
          </div>
        </div>
        <div class="sc-OGyct hVIUVP mt-3">Danh sách bài hát</div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((d, i) => (
          <SongItem key={i} />
        ))}
      </div>
      <div className="mt-5">
        <Album title={"Bạn cũng có thể thích"} data={[1, 2, 3, 4, 5, 6, 7]} />
      </div>
    </div>
  );
};

export default PageTestSong;
