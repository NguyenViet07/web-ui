import React, {useState} from "react";
import {Nav, Navbar, Container} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";


const Header = ({layoutRouter}) => {


    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    {/*<Navbar.Brand href="#home">Navbar</Navbar.Brand>*/}
                    <Nav className="me-auto">
                        {layoutRouter.map((el) => {
                            if (el.title !== 'aa') {
                                return (
                                    <Nav.Item style={{marginRight: '10px'}}>
                                        <NavLink to={el.path}>{el.title}</NavLink>
                                    </Nav.Item>
                                );
                            }
                        })}
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <NavLink to='/login'>Đăng nhập</NavLink>
                        </Navbar.Text>
                        <Navbar.Text>
                            <Nav.Link to='/create'>Đăng ký</Nav.Link>
                        </Navbar.Text>
                        {/*<Navbar.Text>*/}
                        {/*    Signed in as: <a href="#login">Mark Otto</a>*/}
                        {/*</Navbar.Text>*/}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};


export default Header;
