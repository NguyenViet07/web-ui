import React from "react";
const Footer = () => {
  return (
    <div className="ft-page mt-5 ">
      <footer className="page-footer font-small blue pt-4">
        <div className="container-fluid text-md-left">
          <div className="row">
            <div className="col-md-4 mt-md-0 mt-3">
              <h5 className="text-uppercase text-left logo-ft">
                <img src="/logo.jpg" alt="Logo Chiasenhac" />
              </h5>
              <p>Webstite chia sẻ nhạc hàng đầu</p>
            </div>

            <div className="col-md-8 mb-md-0 mb-3">
              <h5 className="text-uppercase">Đối tác âm nhạc</h5>
              <div className="row">
                <div className="col-md-3">
                  <div class="zm-partner-item">
                    <div class="content">
                      <figure class="image is-48x48">
                        <img
                          src="https://static-zmp3.zadn.vn/skins/zmp3-v6.1/images/partner_logo/Kakao-M.png"
                          alt=""
                        />
                      </figure>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div class="zm-partner-item">
                    <div class="content">
                      <figure class="image is-48x48">
                        <img
                          src="https://static-zmp3.zadn.vn/skins/zmp3-v6.1/images/partner_logo/yg.png"
                          alt=""
                        />
                      </figure>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div class="zm-partner-item">
                    <div class="content">
                      <figure class="image is-48x48">
                        <img
                          src="https://static-zmp3.zadn.vn/skins/zmp3-v6.1/images/partner_logo/orcahrd.png"
                          alt=""
                        />
                      </figure>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div class="zm-partner-item">
                    <div class="content">
                      <figure class="image is-48x48">
                        <img
                          src="https://static-zmp3.zadn.vn/skins/zmp3-v6.1/images/partner_logo/universal-1.png"
                          alt=""
                        />
                      </figure>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div class="zm-partner-item">
                    <div class="content">
                      <figure class="image is-48x48">
                        <img
                          src="https://static-zmp3.zadn.vn/skins/zmp3-v6.1/images/partner_logo/sony.png"
                          alt=""
                        />
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-copyright text-center py-3">
          © 2020 Copyright:
          <a href="/"> proteam</a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
