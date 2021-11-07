import React, {useEffect} from "react";
import {CardImg} from "reactstrap";
import {useDispatch} from "react-redux";
const SongViewItem = ({ data }) => {

  const dispatch = useDispatch()

  const listerToMusic = songValue => {
    const action = {
      type: 'SONG_VALUE',
      data: songValue
    }
    dispatch(action)
  }


  useEffect(() => {
    console.log('song', data)
  }, [data])
  return (
    <>
      <div className="sc-LvOOr dhqEfd non-focus" onClick={() => {
        listerToMusic(data)
      }}>
        <div className="sc-gVCZyc dzMbQL">
          <a>
            {
              data.image ? <img
                      alt=""
                      className="sc-cVvZcD fBWTee"
                      src={data.image}
                  /> :
                  <img
                      alt=""
                      className="sc-cVvZcD fBWTee"
                      src="/imgs/pika.jpg"
                  />
            }
          </a>
          <a >
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
            {data.songName}
          </a>
        </div>
      </div>
    </>
  );
};
export default SongViewItem;
