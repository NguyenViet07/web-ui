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
        <h1>Trang tổng quan</h1>

        <Row>
          <Col className="bg-light border add-playlist" xs="3">
            Tên: {userInfoView?.name}
          </Col>
          <br />
          <h1>Tên đăng nhập: {userInfoView?.username}</h1>
          <br />
          {logo ? (
            <img class="sc-jgPznn ivASVi" src={logo} />
          ) : (
            <img class="sc-jgPznn ivASVi" src="/imgs/logo.png" />
          )}

          {userInfoView?.isSinger === 1 && (
            <>
              <h1>Là một ca sĩ </h1>
              {userInfoView?.company ? (
                <h1>
                  {" "}
                  trực thuộc quản lý của công ty: {userInfoView?.company}
                </h1>
              ) : (
                <h1> tự do </h1>
              )}
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

export default HomeInfo;
