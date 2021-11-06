import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Info from "./Info";
import "../../styles/info.css";
import MusicItem from "./MusicItem";

class playlist extends Component {
  render() {
    return (
      <>
        <Container>
          <Info />
          <h1>Playlist</h1>

          <Row>
            <Col className="bg-light border add-playlist" xs="3">
              Add new playlist
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default playlist;
