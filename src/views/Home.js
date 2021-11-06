import React from "react";
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
const Home = () => {
  return (
    <>
      <div>
        <SLideHome />
        <Album title={"Hôm nay nghe gì"} data={[1, 2, 3, 4, 5, 6, 7]} />
        <Album title={"Mới mẻ mỗi ngày"} data={[1, 2, 3, 4, 5, 6, 7]} />
        <Album title={"Được đề xuất"} data={[1, 2, 3, 4, 5, 6, 7]} />
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
