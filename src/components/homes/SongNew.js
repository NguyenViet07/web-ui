import React, {useRef, useState} from "react";
import {Col, Row} from "react-bootstrap";

const SongNew = ({data}) => {
    return (
        <>
            <Row>
                <Col md={6}>
                    <div className="box_header d-flex justify-content-between align-items-end mt-4">
                        <a className="view_all" href="/bai-hat-moi.html">
                            <h2 className="title m-0">Bài hát mới chia sẻ</h2>
                        </a>
                        <a
                            className="link_more"
                            href="/bai-hat-moi.html"
                            title="Bài hát mới nhất 2020"
                        >
                            Xem tất cả
                        </a>
                    </div>
                    <ul className="list-unstyled list_music">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d, i) => (
                            <li
                                key={i}
                                class="media align-items-stretch items-stretch-2200353"
                            >
                                <div class="media-left align-items-stretch mr-4">
                                    <a href="#" title="Feel At Home">
                                        <img src="/imgs/147805.jpg" alt="Feel At Home"/>
                                    </a>
                                </div>
                                <div
                                    class="media-body align-items-stretch d-flex flex-column justify-content-between p-0">
                                    <div>
                                        <h2 class="media-title mt-0 mb-0 title_home_tablet">
                                            <a href="#" title="">
                                                Feel At Home
                                            </a>
                                        </h2>
                                        <div class="author title_home_tablet">
                                            <a href="#">Steve Angello</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="media-right cs-right align-self-center">
                                    <small class="time_stt">1 giờ trước</small>
                                    <small class="time_stt">0</small>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Col>
                <Col md={6}>
                    <div className="box_header d-flex justify-content-between align-items-end mt-4">
                        <a className="view_all" href="/bai-hat-moi.html">
                            <h2 className="title m-0">Bài hát được yêu thích</h2>
                        </a>
                        <a
                            className="link_more"
                            href="/bai-hat-moi.html"
                            title="Bài hát mới nhất 2020"
                        >
                            Xem tất cả
                        </a>
                    </div>
                    <ul className="list-unstyled list_music">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d, i) => (
                            <li
                                key={i}
                                class="media align-items-stretch items-stretch-2200353"
                            >
                                <div class="media-left align-items-stretch mr-4">
                                    <a href="#" title="Feel At Home">
                                        <img src="/imgs/147805.jpg" alt="Feel At Home"/>
                                    </a>
                                </div>
                                <div
                                    class="media-body align-items-stretch d-flex flex-column justify-content-between p-0">
                                    <div>
                                        <h2 class="media-title mt-0 mb-0 title_home_tablet">
                                            <a href="#" title="">
                                                Feel At Home
                                            </a>
                                        </h2>
                                        <div class="author title_home_tablet">
                                            <a href="#">Steve Angello</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="media-right cs-right align-self-center">
                                    <small class="time_stt">1 giờ trước</small>
                                    <small class="time_stt">0</small>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </>
    );
};

export default SongNew;
