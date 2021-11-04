import React, { useRef, useState } from "react";
import SongItem from "../elements/SongItem";
// Import Swiper React components

const Album = ({ data, title }) => {
  return (
    <>
      <div className="p-4">
        <div class="sc-eaHRVx iHLNZK w3-rest mb-3">{title}</div>
        <div className="d-flex flex-wrap">
          {data.map((d, i) => (
            <SongItem key={i} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Album;
