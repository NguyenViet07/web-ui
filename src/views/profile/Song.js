import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import Info from "./Info";
import MusicItem from "./MusicItem";

class Song extends Component {
  render() {
    return (
      <>
        <Container>
          <Row>
            <Info />
            <h1>Bai hat</h1>
            <MusicItem />
          </Row>
        </Container>
      </>
    );
  }
}

export default Song;
