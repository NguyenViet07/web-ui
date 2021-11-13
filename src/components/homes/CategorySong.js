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

const CategorySong = ({ data, title }) => {

    const listTyple = [
        {value: 1, label: 'POP', image: '/image/1.jpg'},
        {value: 2, label: 'Rock', image: '/image/2.jpg'},
        {value: 3, label: 'Jazz', image: '/image/3.jpg'},
        {value: 4, label: 'POP', image: '/image/4.jpg'},
        {value: 5, label: 'Nhạc trữ tình', image: '/image/5.jpg'},
        {value: 6, label: 'Nhạc cách mạng', image: '/image/6.jpg'},
        {value: 7, label: 'Khác', image: 'https://avatar-ex-swe.nixcdn.com/playlist/2019/10/20/6/3/4/2/1571561940569_300.jpg'}
    ]

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
          {listTyple.map((d, i) => (
            <SwiperSlide key={i}>
              <AlbumItem data={d} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default CategorySong;
