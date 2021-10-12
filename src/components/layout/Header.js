import React from "react";
import { Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
const Header = ({ layoutRouter }) => {
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

            <ul className="list-inline m-0">
              <li className="list-inline-item">
                <a href="/" title="Tuan Tran">
                  <span className="wapper-name">Tuan Tran</span>
                </a>
              </li>
              <li className="list-inline-item">/</li>
              <li className="list-inline-item">
                <a href="/" title="Đăng ký">
                  Thoát
                </a>
              </li>
            </ul>
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
