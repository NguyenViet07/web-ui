import React, {useRef, useState} from "react";
// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

// import Swiper core and required modules
import SwiperCore, {Pagination} from "swiper";

// install Swiper modules
SwiperCore.use([Pagination]);

const SLideHome = ({data}) => {
    return (
        <>
            <div className="slide-album">
                <div className="container slide-home">
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <div className="album-item">
                                <a href="#" title="xxxx">
                                    <img src="/imgs/147805.jpg" alt="xx" className="w-100"/>
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="album-item">
                                <a href="#" title="xxxx">
                                    <img src="/imgs/147805.jpg" alt="xx" className="w-100"/>
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="album-item">
                                <a href="#" title="xxxx">
                                    <img src="/imgs/147805.jpg" alt="xx" className="w-100"/>
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="album-item">
                                <a href="#" title="xxxx">
                                    <img src="/imgs/147805.jpg" alt="xx" className="w-100"/>
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="album-item">
                                <a href="#" title="xxxx">
                                    <img src="/imgs/147805.jpg" alt="xx" className="w-100"/>
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="album-item">
                                <a href="#" title="xxxx">
                                    <img src="/imgs/147805.jpg" alt="xx" className="w-100"/>
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
