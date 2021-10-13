import React, {useEffect, useState} from "react";
import { Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {useMutation} from "react-fetching-library";
import {logoutAction} from "../../api/actions/login";
import {useHistory} from "react-router-dom"

const Header = ({ layoutRouter }) => {


  const [userData, setUserData] = useState(null)
  const [userNameView, setUserNameView] = useState(null)

  const {mutate: logout} = useMutation(logoutAction)

  const history = useHistory()

  useEffect(() => {
    const userData1 = JSON.parse(localStorage.getItem('userData'))
    setUserData(userData1)

    setUserNameView(userData1?.user?.userName)

  }, [])

  const logoutFunc = async () => {
    // xoa token trong db

    await logout()
    localStorage.removeItem('userData')
    localStorage.removeItem('token')
    history.push('/')

  }

  return (
    <header id="header">
      <div className="top">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <figure className="m-0">
              <a href="/" title="" className="logo">
                <img src="/logo.jpg" alt="Logo Chiasenhac" />
              </a>
            </figure>
            {
              userNameView &&
              <ul className="list-inline m-0">
                <li className="list-inline-item">
                  <a href="/" title={userNameView}>
                    <span className="wapper-name">{userNameView}</span>
                  </a>
                </li>
                <li className="list-inline-item">/</li>
                <li className="list-inline-item">
                  <a href="/" title="Thoát" onClick={logoutFunc}>
                    Thoát
                  </a>
                </li>
              </ul>
            }
          </div>
        </div>
      </div>
      <nav className="bottom navbar navbar-expand-lg navbar-light bg-light ghw-bottom-header p-0">
        <div className="container">
          <Nav>
            {layoutRouter.map((el) => {
              return (
                <Nav.Item style={{marginRight: '10px'}}>
                  <NavLink to={el.path}>{el.title}</NavLink>
                </Nav.Item>
              );
            })}
          </Nav>
        </div>
      </nav>
    </header>
  );
};

export default Header;
