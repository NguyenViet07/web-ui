import React, {useRef, useState} from "react";
import {Col, Row} from "react-bootstrap";

const AlbumNew = ({data}) => {
    return (
        <>
            <div>
                <div className="box_header d-flex justify-content-between align-items-end mt-4 mb-2">
                    <a className="view_all" href="/mp3/vietnam.html">
                        <h2 className="title m-0">Album mới nhất 2021</h2>
                    </a>
                    <a
                        className="link_more"
                        href="/mp3/vietnam.html"
                        title="Album mới nhất 2021"
                    >
                        Xem tất cả
                    </a>
                </div>
                <Row className="row10px">
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((d, i) => (
                        <Col md={2} key={i}>
                            <div className="card card1">
                                <div className="card-header">
                                    <a href="asssx">
                                        <img className="w-100" src="/imgs/147805.jpg" alt="xx"/>
                                    </a>
                                </div>
                                <div className="card-body">
                                    <h3 className="card-title">
                                        <a
                                            href="/nghe-album/boyz-single-xss6qs5rqke4ha.html"
                                            title="Boyz (Single)"
                                        >
                                            Boyz (Single)
                                        </a>
                                    </h3>
                                    <p className="card-text">
                                        <a href="https://chiasenhac.vn/tim-kiem?q=Jesy Nelson&amp;filter=ca-si">
                                            Jesy Nelson
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
};

export default AlbumNew;
