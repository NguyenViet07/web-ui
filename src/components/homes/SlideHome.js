import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

// import Swiper core and required modules
import SwiperCore, { EffectFade, Pagination, Autoplay } from "swiper";

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, EffectFade]);
// install Swiper modules

const SLideHome = ({ data }) => {
  return (
    <>
      <div className="">
        <div className="container slide-home">
          <Swiper
            effect={"fade"}
            slidesPerView={1}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="album-item">
                <a href="#" title="xxxx">
                  <img
                    src="/imgs/1620986388249.jpg"
                    alt="xx"
                    className="w-100"
                  />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="album-item">
                <a href="#" title="xxxx">
                  <img
                    src="/imgs/1633489926091.jpg"
                    alt="xx"
                    className="w-100"
                  />
                </a>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="album-item">
                <a href="#" title="xxxx">
                  <img
                    src="/imgs/1635307788846.jpg"
                    alt="xx"
                    className="w-100"
                  />
                </a>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default SLideHome;
