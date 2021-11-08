import React from "react";
import { useState } from "react";
// import sections
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import RandomSong from "../components/elements/RandomSong";
import SongItem from "../components/elements/SongItem";
import Album from "../components/homes/Album";

const PageSingleSong = () => {
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
              <span class="sc-dYTRRX krDxsF">Tên bài hát:</span>
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
        <div>
          <div class="sc-OGyct hVIUVP mt-3">Bình luận</div>
          <div class="action">
            <h3 class="subtitle has-text-weight-bold">21 Bình luận</h3>
          </div>
          <form class="box_form_comment form-comment-0 mb-5">
            <div class="form-group emoji-picker-container">
              <textarea
                class="form-control comment"
                name="comment"
                rows="3"
                placeholder="Viết bình luận của bạn tại đây."
                data-emojiable="true"
              ></textarea>
              <input
                type="hidden"
                class="music_id"
                name="music_id"
                value="2196994"
              />
              <button
                onclick="postComment(0)"
                class="btn my-2 my-sm-0 waves-effect waves-light btn-upload btn_cloud_up"
              >
                Đăng Bình Luận
              </button>
            </div>
          </form>
          <div class="media comment-item mt-3">
            <div class="media-left">
              <figure class="image is-rounded is-50x50">
                <img
                  src="https://s120-ava-talk.zadn.vn/4/f/d/7/0/120/5d6327375053a2f74af896a85b3a35e6.jpg"
                  alt=""
                />
              </figure>
            </div>
            <div class="media-content">
              <div class="username">
                Nguyễn Diệu Linh <span class="post-time">2 ngày trước</span>
              </div>
              <div className="idAWVU ct-cmt">quá hay chị ơi</div>

              <div class="comment-reply-list-wrapper"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Album title={"Bạn cũng có thể thích"} data={[1, 2, 3, 4, 5, 6, 7]} />
      </div>
    </div>
  );
};

export default PageSingleSong;
