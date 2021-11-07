import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import AlbumItem from "../elements/AlbumItem";
// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

// import Swiper core and required modules
import SwiperCore, { EffectFade, Pagination, Autoplay } from "swiper";

// install Swiper modules
SwiperCore.use([Autoplay, EffectFade]);

const Album = ({ data, title, listSong }) => {
  return (
    <>
      <div className="p-4">
        <div class="sc-eaHRVx iHLNZK w3-rest mb-3">{title}</div>
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="mySwiper1"
        >
          {data.map((d, i) => (
            <SwiperSlide key={i}>
              <AlbumItem />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Album;
