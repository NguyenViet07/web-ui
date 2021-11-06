import React, { Component } from "react";
import{Row,Col, Container,} from 'reactstrap'
import Info from "./Info";
import MusicItem from "./MusicItem";

class Album extends Component {
  render() {
    return (
      <>
      <Container>
          <Info />
          <h1>Album</h1>
          <Row>
            <Col className="bg-light border add-playlist" xs="3" >
              Add new album
            </Col>
            <MusicItem />
          </Row>
          
      </Container>


      </>
    );
  }
}

export default Album;
