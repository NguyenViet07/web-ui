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

const SongNew = ({ data, title }) => {
  return (
    <>
      <div className="p-4">
        <div class="sc-eaHRVx iHLNZK w3-rest mb-3">{title}</div>
        <Swiper
          slidesPerView={1}
          effect={"fade"}
          spaceBetween={30}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          className="mySwiper2"
        >
          {data.map((d, i) => (
            <SwiperSlide key={i}>
              <div class="sc-hGNDBt gwLCcx">
                <div class="sc-gSYCTC fkCSEE">
                  <div
                    title="Chỉ Còn Là Ký Ức"
                    class="sc-iNiQeE enMFlU sc-lfIURI kESaHU"
                  >
                    <img
                      src="https://avatar-ex-swe.nixcdn.com/song/2021/10/29/0/8/0/c/1635509603896_300.jpg"
                      class="sc-jgPznn ivASVi"
                      alt=""
                    />
                  </div>
                </div>
                <div class="sc-dwgyss ipbSEQ">
                  <h4
                    class="sc-efHXLn kuWvPE sc-lmGQAZ hvQtvl"
                    title="Chỉ Còn Là Ký Ức"
                  >
                    <a
                      href="/bai-hat/chi-con-la-ky-uc-bang-cuong.9zmwOl1ZQUla.html"
                      class="sc-iBzFoy gwofgg"
                    >
                      Chỉ Còn Là Ký Ức
                    </a>
                  </h4>
                  <div class="sc-bYsYVM ibKgcD w3-row">
                    <a href="/nghe-si-bang-cuong.html">
                      <div
                        class="sc-hVHxqd eZPbWG w3-col"
                        title="Bằng Cường"
                      ></div>
                    </a>
                    <div class="sc-fIMEkS keOeCG w3-col"></div>
                    <div class="sc-qFtgn kBSjbO w3-rest">
                      <span class="sc-eitjjY dWqbEy">
                        <a href="/nghe-si-bang-cuong.html">Bằng Cường</a>
                      </span>
                    </div>
                  </div>
                  <span class="sc-eksIiz jnHdeb">
                    <i class="ic_calendar_normal sc-kfHHEp dnYhLk"></i>Ngày phát
                    hành: 31/10/2021
                  </span>
                  <div class="sc-EzviT iMCVKI"></div>
                  <p class="sc-hJnZyO jpkIwU"></p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default SongNew;
