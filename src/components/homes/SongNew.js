import React, {useEffect, useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import SwiperCore, {EffectFade, Pagination, Autoplay} from "swiper";
import {useMutation} from "react-fetching-library";
import {getListSongByLike, getSongNewCreated} from "../../api/actions/song";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";

// install Swiper modules
SwiperCore.use([Autoplay, EffectFade]);

const SongNew = ({data, title}) => {

    const {mutate: _getSongNewCreated} = useMutation(getSongNewCreated)

    const [songInfo, seSongInfo] = useState(null)

    const dispatch = useDispatch()

    const history = useHistory()

    const listerToMusic = songValue => {
        const action = {
            type: 'SONG_VALUE',
            data: songValue
        }
        dispatch(action)
    }

    useEffect(async () => {
        const response = await _getSongNewCreated()
        if (response.payload?.errorCode === '200') {
            const res = response.payload.data
            console.log('res', res)
            seSongInfo(res)
        } else {
            toast.error(response.payload?.message)
        }

    }, [])

    return (
        <>
            <div className="p-4" onClick={() => {
                listerToMusic(songInfo)
                history.push(`/page-single-song/${songInfo?.songId}`)
            }}>
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
                    <SwiperSlide>
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
                                        {songInfo?.songName}
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
                        <a href="/nghe-si-bang-cuong.html">{songInfo?.description}</a>
                      </span>
                                    </div>
                                </div>
                                <span class="sc-eksIiz jnHdeb">
                    <i class="ic_calendar_normal sc-kfHHEp dnYhLk"></i>Ngày phát
                    hành: {songInfo?.createDate}
                  </span>
                                <div class="sc-EzviT iMCVKI"></div>
                                <p class="sc-hJnZyO jpkIwU"></p>
                            </div>
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>
        </>
    );
};

export default SongNew;
