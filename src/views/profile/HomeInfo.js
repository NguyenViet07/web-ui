import React from "react";
import { Container, Row, Col } from "reactstrap";
import Info from "./Info";
import "../../styles/info.css";
import MusicItem from "./MusicItem";


const HomeInfo = ({}) => {
    return (
      <>
        <Container>
          <h1>Playlist</h1>

          <Row>
            <Col className="bg-light border add-playlist" xs="3">
              Add new playlist
            </Col>
            <br />
            <h1>Bai hat</h1>
            <MusicItem />
            <br />
            <h1>Album</h1>
            <MusicItem />
          </Row>
        </Container>
      </>
    );
}

export default HomeInfo;
