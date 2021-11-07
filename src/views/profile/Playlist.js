import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/info.css";

const Playlist = ({}) => {

    return (
      <>
        <Container>
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

export default Playlist;
