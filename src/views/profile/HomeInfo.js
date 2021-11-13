import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Info from "./Info";
import "../../styles/info.css";
import MusicItem from "./MusicItem";
import { useMutation } from "react-fetching-library";
import { findByUserName } from "../../api/actions/users";

const HomeInfo = ({}) => {
  const { mutate: _findByUserName } = useMutation(findByUserName);

  const [userInfoView, setUserInfoView] = useState(null);
  const [logo, setLogo] = useState(null);

  const getUserByUserName = async (usernameInput) => {
    const response = await _findByUserName({ username: usernameInput });
    if (response.payload?.errorCode === "200") {
      console.log(response.payload?.data);
      setUserInfoView(response.payload?.data);
      setLogo(response.payload?.data?.image || null);
    } else {
      setUserInfoView(null);
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    // setUserData(userData1)

    getUserByUserName(userData?.user?.userName);
  }, []);

  return (
    <>
      <Container>
        <h1 className="mb-4" style={{ fontSize: "24px" }}>
          Thông tin tài khoản
        </h1>

        <div className="row">
          <div className="col-md-2">
            {logo ? (
              <img
                class="sc-jgPznn ivASVi"
                src={logo}
                style={{ width: "150px", height: "150px" }}
                alt=""
              />
            ) : (
              <img
                class="sc-jgPznn ivASVi"
                src="/imgs/logo.png"
                style={{ width: "150px", height: "150px" }}
                alt=""
              />
            )}
          </div>
          <div className="col-md-10">
            <h3 style={{ color: "#2DAAED", fontSize: "18px" }}>
              {userInfoView?.name}
            </h3>
            {userInfoView?.isSinger === 1 ? (
              <span style={{ fontSize: "14px" }}>
                Hãy đăng bài hát của bạn cho mọi người cùng nghe!
              </span>
            ) : (
              <span style={{ fontSize: "14px" }}>
                Đăng ký để trở thành ca sĩ ngay - Nâng cấp ngay!
              </span>
            )}
          </div>
        </div>
        <Row>
          <div className="col-md-12 d-flex cs-ifp">
            <div class="sc-fKTzBO bJDmNC ">Tên hiển thị:</div>
            <div class="sc-cTEyPb edjoEY ">{userInfoView?.name}</div>
          </div>
          <div className="col-md-12 d-flex cs-ifp">
            <div class="sc-fKTzBO bJDmNC ">Tên đăng nhập</div>
            <div class="sc-cTEyPb edjoEY ">{userInfoView?.username}</div>
          </div>
          <div className="col-md-12 d-flex cs-ifp">
            <div class="sc-fKTzBO bJDmNC ">Ngày sinh:</div>
            <div class="sc-cTEyPb edjoEY ">11/02/1998</div>
          </div>
          <div className="col-md-12 d-flex cs-ifp">
            <div class="sc-fKTzBO bJDmNC ">Email:</div>
            <div class="sc-cTEyPb edjoEY ">trananhtuan@gmail.com</div>
          </div>
          <div className="col-md-12 d-flex cs-ifp">
            <div class="sc-fKTzBO bJDmNC ">Địa chỉ:</div>
            <div class="sc-cTEyPb edjoEY ">Chưa cập nhập</div>
          </div>
          <div className="col-md-12 d-flex cs-ifp">
            <div class="sc-fKTzBO bJDmNC ">Số điện thoại:</div>
            <div class="sc-cTEyPb edjoEY ">Chưa cập nhập</div>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default HomeInfo;
