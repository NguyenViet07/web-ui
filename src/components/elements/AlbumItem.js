import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
const AlbumItem = ({ data }) => {

  const history = useHistory()
  // useEffect(async () => {
  //   console.log(data)
  // }, [data])

  return (
    <>
      <div className="sc-LvOOr dhqEfd non-focus" onClick={() => {
        history.push(`/style-song/${data.value}`)}
      }>
        <div className="sc-gVCZyc dzMbQL">
          <a>
            <img
              alt=""
              className="sc-cVvZcD fBWTee"
              src={data.image}
            />
          </a>
          <a>
            <div className="sc-ksKZJi jZMSEE"></div>
          </a>
          <div className="sc-jfDjMo gsyTqS ic_play_circle"></div>
          <div className="sc-chBqgb ktvkPn">
            <div className="jss22">
              <div>
                <div
                  className="sc-hndrU iPDNHq"
                  name="ic_more_vertical"
                  size="18"
                >
                  <div
                    title="Thêm"
                    className="sc-clGIgy hkeIzO ic_more_vertical"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="sc-bIojfJ eKvyCy ic_play_circle"></div>
        </div>
        <div title="But First, Coffee" className="sc-jEQqMG jOtmSH">
          <a
            className="sc-kOSMCU cAgHit"
          >
            {data.label}
          </a>
        </div>
      </div>
    </>
  );
};
export default AlbumItem;
