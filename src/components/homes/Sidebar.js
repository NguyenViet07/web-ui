import React, { useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
const SidebarHome = ({ data }) => {
  return (
    <>
      <div className="mt-4 box_header d-flex justify-content-between align-items-end">
        <a className="view_all" href="/nhac-hot.html">
          <h2 className="title m-0">Bảng xếp hạng</h2>
        </a>
        <a className="link_more" href="/nhac-hot.html" title="">
          Nghe tất cả
          <span className="ion-android-arrow-dropright-circle"></span>
        </a>
      </div>
      <ul className="list-unstyled list_music">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d, i) => (
          <li
            key={i}
            className="media align-items-stretch items-stretch-2200353"
          >
            <div className="media-left align-items-stretch mr-4">
              <a href="#" title="Feel At Home">
                <img src="/imgs/147805.jpg" alt="Feel At Home" />
              </a>
            </div>
            <div className="media-body align-items-stretch d-flex flex-column justify-content-between p-0">
              <div>
                <h2 className="media-title mt-0 mb-0 title_home_tablet">
                  <a href="#" title="">
                    Feel At Home
                  </a>
                </h2>
                <div className="author title_home_tablet">
                  <a href="#">Steve Angello</a>
                </div>
              </div>
            </div>
            <div className="media-right cs-right align-self-center">
              <small className="time_stt">0</small>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
export default SidebarHome;
