import React from "react";
import { Col, CardImg } from "reactstrap";

const MusicItem = ({}) => {
    return (
      <>
        <>
          <Col xs="3">
            <CardImg src="/imgs/pika.jpg"></CardImg>
          </Col>
          <Col xs="3">
            <CardImg src="/imgs/pika.jpg"></CardImg>
          </Col>
          <Col xs="3">
            <CardImg src="/imgs/pika.jpg"></CardImg>
          </Col>
        </>
      </>
    );
}

export default MusicItem;
