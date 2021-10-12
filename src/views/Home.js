import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import sections

import SLideHome from "../components/homes/SlideHome";
import AlbumNew from "../components/homes/AlbumNew";
import SongNew from "../components/homes/SongNew";
import SidebarHome from "../components/homes/Sidebar";

const Home = () => {
    return (
        <>
            <SLideHome/>
            <Container>
                <Row>
                    <Col md={8}>
                        <AlbumNew></AlbumNew>
                        <img src="/imgs/qc.png" alt="" className="w-100"/>
                        <SongNew></SongNew>
                    </Col>
                    <Col md={3}>
                        <SidebarHome/>
                    </Col>
                </Row>
            </Container>
            <Container>
                <img src="/imgs/qc.png" alt="" className="w-100 mb-4"/>
            </Container>
        </>
    );
};

export default Home;
