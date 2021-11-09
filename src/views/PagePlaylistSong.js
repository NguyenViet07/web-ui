import React, {useEffect} from "react";
import { useState } from "react";
// import sections
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import RandomSong from "../components/elements/RandomSong";
import SongItem from "../components/elements/SongItem";
import Album from "../components/homes/Album";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {useMutation} from "react-fetching-library";
import {findBySongId} from "../api/actions/song";
import {getInfoAlbum} from "../api/actions/album";
import {getInfoPlaylist} from "../api/actions/playlist";

const PagePlaylistSong = () => {

  const id = useParams().id

  const {mutate: _getInfoPlaylist} = useMutation(getInfoPlaylist)

  const [listSong, setListSong] = useState([])
  const [playlist, setPlaylist] = useState(null)
  const [userName, setUserName] = useState([])

  useEffect(async () => {

    if (id) {
      const data = {
        playlistId: id,
      }
      const response = await _getInfoPlaylist(data)
      if (response.payload?.errorCode === '200') {
        const res = response.payload.data
        setListSong(res.songResponseList)
        setPlaylist(res.playlist)
        setUserName(res.userName)
      } else {
        toast.error(response.payload?.message)
      }

    }

  }, [])

  return (
    <div className="p-4">
      <div className="row">
        <div className="col-md-3">
          <div className="h5pibw-2 p-4 pt-0 ">
            {
              playlist?.image ? <img
                  className="antedm-1 fZPioS"
                  src={playlist.image}
                  alt=""
              /> : <img
                  className="antedm-1 fZPioS"
                  src="https://avatar-ex-swe.nixcdn.com/song/2021/10/21/c/d/d/a/1634807126106_300.jpg"
                  alt=""
              />
            }
          </div>
        </div>
        <div className="col-md-9">
          <div>
            <div class="sc-jEKYNM bdIIfT">
              <span class="sc-dYTRRX krDxsF">Tên:</span>
              <span class="sc-hxPjim iJtgKn"> {playlist?.namePlaylist}</span>
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
            <div class="sc-gpQvLH gOzSIw __3dot-content">{userName}</div>
          </div>
        </div>
        <div class="sc-OGyct hVIUVP mt-3">Danh sách bài hát</div>
        {listSong?.map((el, i) => (
          <SongItem key={i} data={el} />
        ))}
      </div>
    </div>
  );
};

export default PagePlaylistSong;
