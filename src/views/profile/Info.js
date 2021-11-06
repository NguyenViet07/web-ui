import React, { Component } from "react";
import "../../styles/info.css";
import {
  CardBody,
  Navbar,
  Card,
  Input,
  CardTitle,
  Button,
  Collapse,
  NavItem,
  CardImg,
  NavLink,
  InputGroup,
  Nav,
  Container,
  Row,
  Col,
  List,
  ListInlineItem,
  Image,
} from "reactstrap";
import HomeInfo from "./HomeInfo";
// import { Link, NavLink } from "react-router-dom";
 import MusicItem from "./MusicItem";

class Info extends Component {
  render() {
    return (
      <div className="content-info">
        <Card>
          <CardImg
            alt="Card image cap"
            src="https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-600x600.jpg"
            top
            className="user-img"
          />
          <CardBody>
            <CardTitle tag="h5">Min</CardTitle>
          </CardBody>
        </Card>

        <Navbar expand="md" light className="nav navbar-nav navbar-center">
          <Collapse navbar>
            <Nav className="me-auto" navbar>
              <NavItem className="nav-item">
                <NavLink href="/home-info"> TONG QUAN</NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <NavLink href="/song">SONG</NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <NavLink href="album">ALBUM</NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <NavLink href="playlist">PLAYLIST</NavLink>
              </NavItem>
              <NavItem className="nav-item">
                <NavLink href="#">YEU THICH</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <br />
      </div>
    );
  }
}

export default Info;
