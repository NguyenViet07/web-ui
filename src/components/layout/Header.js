import React from "react";
import {Nav} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";



const Header = ({layoutRouter}) => {
    console.log('layoutRouter', layoutRouter)
  return (
    <header >
        <Nav defaultActiveKey="/home" as="ul">
            {layoutRouter.map((el) => {
                return (
                    <Nav.Item as="li">
                        <Nav.Link href={el.path}>{el.title}</Nav.Link >
                    </Nav.Item>
                );
            })}
        </Nav>
    </header>
  );
};


export default Header;
