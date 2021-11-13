import React, { useEffect, useState } from "react";
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
import Paginations from "../components/homes/Paginations";
import { useMutation } from "react-fetching-library";
import {
  createSong,
  getListSongCreated,
  getListSongView,
} from "../api/actions/song";
import { getListAlbum } from "../api/actions/album";
import ListAlbum from "../components/homes/ListAlbum";
const Home = () => {
  const { mutate: _getListSongCreated } = useMutation(getListSongCreated);
  const { mutate: _getListSongView } = useMutation(getListSongView);
  const { mutate: _getListAlbum } = useMutation(getListAlbum);

  const [listMySongCreated, setListMySongCreated] = useState([]);
  const [listMySongView, setListMySongView] = useState([]);
  const [listAlbumNew, setListAlbumNew] = useState([]);

  const listSongCreated = async () => {
    const response = await _getListSongCreated();
    if (response.payload?.errorCode === "200") {
      setListMySongCreated(response.payload?.data);
    } else {
      setListMySongCreated([]);
    }
  };

  const listSongView = async () => {
    const response = await _getListSongView();
    if (response.payload?.errorCode === "200") {
      setListMySongView(response.payload?.data);
    } else {
      setListMySongView([]);
    }
  };

  const listAlbum = async () => {
    const response = await _getListAlbum();
    if (response.payload?.errorCode === "200") {
      setListAlbumNew(response.payload?.data);
    } else {
      setListAlbumNew([]);
    }
  };

  useEffect(() => {
    listSongCreated();
    listSongView();
    listAlbum();
  }, []);

  return (
    <>
      <div>
        <SLideHome />
        <Album title={"Hôm nay nghe gì"} data={listMySongCreated} />
        <Album title={"Mới mẻ mỗi ngày"} data={listMySongView} />
        <ListAlbum title={"Album được đề xuất cho bạn"} data={listAlbumNew} />
        <SongNew title={"Mới phát hành"} data={[1, 2, 3, 4, 5, 6, 7]}></SongNew>
        <ListSong
          title={"Bài hát được quan tâm mỗi ngày"}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        />
        <CategorySong title={"Chuyên mục"} data={[1, 2, 3, 4, 5, 6, 7]} />
        <br />
        {/* <Paginations /> */}
      </div>
    </>
  );
};

export default Home;
