import React, {useEffect, useState} from "react";
import { Container, Row, Col, Pagination } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import sections
import SLideHome from "../components/homes/SlideHome";
import AlbumNew from "../components/homes/Album";
import SongNew from "../components/homes/SongNew";
import Album from "../components/homes/Album";
import SongItem from "../components/elements/SongItem";
import ListSong from "../components/homes/ListSong";
import CategorySong from "../components/homes/CategorySong";
import Paginations  from '../components/homes/Paginations';
import {useMutation} from "react-fetching-library";
import {createSong, getListSongCreated, getListSongView} from "../api/actions/song";
const Home = () => {

  const {mutate: _getListSongCreated} = useMutation(getListSongCreated)
  const {mutate: _getListSongView} = useMutation(getListSongView)

  const [listMySongCreated, setListMySongCreated] = useState([])
  const [listMySongView, setListMySongView] = useState([])

  const getListMySongCreated = async () => {
    const response = await _getListSongCreated()
    if (response.payload?.errorCode === '200') {
      setListMySongCreated(response.payload?.data)
    } else {
      setListMySongCreated([])
    }
  };

  const getListMySongView = async () => {
    const response = await _getListSongView()
    if (response.payload?.errorCode === '200') {
      setListMySongView(response.payload?.data)
    } else {
      setListMySongView([])
    }
  };


  useEffect(() => {
    getListMySongCreated()
    getListMySongView()
  }, [])

  return (
    <>
      <div>
        <SLideHome />
        <Album title={"Hôm nay nghe gì"} data={listMySongCreated} />
        <Album title={"Mới mẻ mỗi ngày"} data={listMySongView} />
        <Album title={"Được đề xuất"} data={listMySongCreated} />
        <SongNew title={"Mới phát hành"} data={[1, 2, 3, 4, 5, 6, 7]}></SongNew>
        <ListSong title={"Bài hát"} data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
        <CategorySong title={"Chuyên mục"} data={[1, 2, 3, 4, 5, 6, 7]} />
        <br />
        <Paginations />
      </div>
    </>
  );
};

export default Home;
