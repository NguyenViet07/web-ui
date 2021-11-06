import React, { Component } from "react";
import { Container, Row, Col, CardImg } from "reactstrap";

class MusicItem extends Component {
  render() {
    return (
      <>
        <>
          <Col xs="3">
            <CardImg src="https://o.rada.vn/data/image/2021/02/19/loi-bai-hat-anh-lam-gi-sai-700.jpg"></CardImg>
          </Col>
          <Col xs="3">
            <CardImg src="https://o.rada.vn/data/image/2021/02/19/loi-bai-hat-anh-lam-gi-sai-700.jpg"></CardImg>
          </Col>
          <Col xs="3">
            <CardImg src="https://o.rada.vn/data/image/2021/02/19/loi-bai-hat-anh-lam-gi-sai-700.jpg"></CardImg>
          </Col>
        </>
      </>
    );
  }
}

export default MusicItem;
