import { useState } from "react";
import React from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
const SongItem = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <div className="col-md-6 p-2">
        <div class="sc-bgVQgE dQtBnd w3-row non-focus">
          <div class="sc-bVhZWL kKDsJV w3-col">
            <div class="sc-fudrna dowPBJ">
              <img
                src="https://avatar-ex-swe.nixcdn.com/song/2021/10/21/c/d/d/a/1634805780011_300.jpg"
                alt=""
              />
            </div>
          </div>
          <div class="sc-ijBzsJ fvQZwL w3-col w3-right">
            <div class="sc-tbhkc prFOj w3-row">
              <div class="sc-kwTAbF figqR ic_headphone w3-col"></div>
              <div class="sc-izAXJK fWWlAv w3-col">146.3K</div>
            </div>
            <div class="sc-ezFbHo fgxGhh">
              <div class="jss22">
                <div>
                  <div
                    class="sc-hndrU iPDNHq"
                    name="ic_more_vertical"
                    size="18"
                  >
                    <div class="sc-7s83t7-0 cZPbyp">
                      <div class="jss25">
                        <div>
                          <div
                            class="sc-1h4f6p9-0 iQLiGW"
                            name="ic_more_vertical"
                            size="18"
                          >
                            <ButtonDropdown
                              className="MuiButtonBase-root MuiIconButton-root jss30"
                              isOpen={isOpen}
                              toggle={toggle}
                            >
                              <DropdownToggle>
                                <span class="MuiIconButton-label">
                                  <span class="sc-1h4f6p9-1 kRuzxG ic_more_vertical"></span>
                                </span>
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem>Thêm vào playlist</DropdownItem>
                                <DropdownItem>Chia sẻ</DropdownItem>
                              </DropdownMenu>
                            </ButtonDropdown>
                            {/* <button
                        class="MuiButtonBase-root MuiIconButton-root jss30"
                        tabindex="-1"
                        type="button"
                      >
                        <span class="MuiTouchRipple-root"></span>
                      </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="sc-dhtMFf kMNHXw w3-rest">
            <div title="nằm ngủ emru" class="sc-gJFlVA jUfTUC">
              nằm ngủ emru
            </div>
            <h5 class="sc-dPaNSN dXuQNN sc-bryaQV cXHXDv">
              <a class="sc-bBjRzc bhjKRs" href="/nghe-si-bich-phuong.html">
                <span title="Bích Phương" class="sc-cTJmaU frvmGr">
                  Bích Phương
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
