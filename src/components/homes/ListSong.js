import React, {useEffect, useRef, useState} from "react";
import SongItem from "../elements/SongItem";
import {useMutation} from "react-fetching-library";
import {getListSongByComment, getListSongByLike} from "../../api/actions/song";
import {toast} from "react-toastify";
// Import Swiper React components

const Album = ({ data, title }) => {

    const {mutate: _getListSongByComment} = useMutation(getListSongByComment)

    const [listSong, setListSong] = useState([])

    useEffect(async () => {
        const response = await _getListSongByComment()
        if (response.payload?.errorCode === '200') {
            const res = response.payload.data
            setListSong(res)
        } else {
            toast.error(response.payload?.message)
        }

    }, [])

  return (
    <>
      <div className="p-4">
        <div class="sc-eaHRVx iHLNZK w3-rest mb-3">{title}</div>
        <div className="d-flex flex-wrap">
          {listSong.map((el, i) => (
            <SongItem key={i} data={el} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Album;
