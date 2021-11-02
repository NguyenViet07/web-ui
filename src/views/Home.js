import React from "react";
import { Container, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import sections
import SLideHome from "../components/homes/SlideHome";
import AlbumNew from "../components/homes/Album";
import SongNew from "../components/homes/SongNew";
import SidebarHome from "../components/homes/Sidebar";
import Album from "../components/homes/Album";

const Home = () => {
  return (
    <>
      <div>
        <SLideHome />
        <Album title={"Hôm nay nghe gì"} data={[1, 2, 3, 4, 5, 6, 7]} />
        <Album title={"Mới mẻ mỗi ngày"} data={[1, 2, 3, 4, 5, 6, 7]} />
        <Album title={"Được đề xuất"} data={[1, 2, 3, 4, 5, 6, 7]} />
        <SongNew></SongNew>
      </div>
    </>
  );
};

export default Home;
