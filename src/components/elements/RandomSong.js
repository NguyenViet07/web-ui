import React, {useEffect, useState} from "react";
import {useMutation} from "react-fetching-library";
import {infoAlbum} from "../../api/actions/album";
import {getListSongByLike} from "../../api/actions/song";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import SongItem from "./SongItem";
import {toast} from "react-toastify";
const RandomSong = ({ }) => {

    const {mutate: _getListSongByLike} = useMutation(getListSongByLike)

    const [listSong, setListSong] = useState([])

    const dispatch = useDispatch()

    const history = useHistory()

    const listerToMusic = songValue => {
        const action = {
            type: 'SONG_VALUE',
            data: songValue
        }
        dispatch(action)
    }

    useEffect(async () => {
        const response = await _getListSongByLike()
        if (response.payload?.errorCode === '200') {
            const res = response.payload.data
            setListSong(res)
        } else {
            toast.error(response.payload?.message)
        }

    }, [])

    return (
    <>
      <div className="mt-4 box_header d-flex justify-content-between align-items-end">
        <a className="view_all" href="/nhac-hot.html">
          <h2 className="title m-0">Có thể bạn sẽ thích</h2>
        </a>
      </div>
      <ul className="list-unstyled list_music">
          {listSong?.map((el, i) => (
          <li
            key={i}
            className="media align-items-stretch items-stretch-2200353"
            onClick={() => {
                listerToMusic(el)
                history.push(`/page-single-song/${el.songId}`)
            }}
          >
            <div className="media-left align-items-stretch mr-4">
              <a href="#" title={el?.songName}>
                  {el?.image? <img src={el?.image} alt="Feel At Home" /> : <img src="/imgs/147805.jpg" alt="Feel At Home" /> }
              </a>
            </div>
            <div className="media-body align-items-stretch d-flex flex-column justify-content-between p-0">
              <div>
                <h2 className="media-title mt-0 mb-0 title_home_tablet">
                  <a href="#" title="">
                      {el?.songName}
                  </a>
                </h2>
                <div className="author title_home_tablet">
                  <a href="#">{el?.singerName}</a>
                </div>
              </div>
            </div>
            <div className="media-right cs-right align-self-center">
              <small className="time_stt">{el?.view}</small>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
export default RandomSong;
