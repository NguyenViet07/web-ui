import {useEffect, useState} from "react";
import React from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
const SongItem = ({ data }) => {

  const [songInfo, setSongInfo] = useState(null)

  const dispatch = useDispatch()

  const history = useHistory()

  const listerToMusic = songValue => {
    const action = {
      type: 'SONG_VALUE',
      data: songValue
    }
    dispatch(action)
  }


  useEffect( () => {

    if (data) {
      setSongInfo(data)
    }

  }, [data])

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <div className="col-md-6 p-2">
        <div class="sc-bgVQgE dQtBnd w3-row non-focus">
          <div class="sc-bVhZWL kKDsJV w3-col">
            <div class="sc-fudrna dowPBJ">
              {
                songInfo?.image ? <img
                        src={songInfo?.image}
                        alt=""
                    /> :
                    <img
                        src="https://avatar-ex-swe.nixcdn.com/song/2021/10/21/c/d/d/a/1634805780011_300.jpg"
                        alt=""
                    />
              }

            </div>
          </div>
          <div class="sc-ijBzsJ fvQZwL w3-col w3-right">
            <div class="sc-tbhkc prFOj w3-row">
              <div class="sc-kwTAbF figqR ic_headphone w3-col"></div>
              <div class="sc-izAXJK fWWlAv w3-col">{songInfo?.view}</div>
            </div>
          </div>
          <div class="sc-dhtMFf kMNHXw w3-rest">
            <div title={songInfo?.songName} class="sc-gJFlVA jUfTUC">
              {songInfo?.songName}
            </div>
            <h5 class="sc-dPaNSN dXuQNN sc-bryaQV cXHXDv">
              <a class="sc-bBjRzc bhjKRs" onClick={() => {
                listerToMusic(data)
                history.push(`/page-single-song/${songInfo?.songId}`)
              }}>
                <span title={songInfo?.singerName} class="sc-cTJmaU frvmGr">
                  {songInfo?.singerName}
                </span>
              </a>
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};
export default SongItem;
