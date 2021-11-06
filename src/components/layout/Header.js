import React, { useEffect, useState } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Nav, NavItem } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import { useMutation } from "react-fetching-library";
import { logoutAction } from "../../api/actions/login";
import { useHistory } from "react-router-dom";

const Header = ({ layoutRouter }) => {
  // const [userData, setUserData] = useState(null)
  const [userNameView, setUserNameView] = useState(null);
  const [role, setRole] = useState(null);

  const { mutate: logout } = useMutation(logoutAction);

  const history = useHistory();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    // setUserData(userData1)

    console.log('userData', layoutRouter)
    setUserNameView(userData?.user?.userName);
    setRole(userData?.role);
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logoutFunc = async () => {
    // xoa token trong db

    await logout();
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <header id="header">
      <div className="kyusxl-58 sc-13vopkh-1 iBiofn hiOVWZ">
        <div className="sc-13vopkh-2 qIfwr">
          <div className="sc-13vopkh-9 fioJms">
            <figure className="m-0">
              <a href="/" title="" className="logo">
                <img src="/logo.jpg" alt="Logo Chiasenhac" />
              </a>
            </figure>
          </div>

          <div class="sc-13vopkh-22 hqNQxP">
            <div class="wrapper-left">
              <p class="sc-13vopkh-30 JBcAl mb-0 ml-16px ">
                {!userNameView && (
                  <div style={{ marginRight: "10px" }}>
                    <NavLink to={"/login"}>Đăng nhập </NavLink>/
                    <NavLink to={"/create"}> Đăng ký</NavLink>
                  </div>
                )}
              </p>
            </div>
            <div class="wrapper-left">
              <div class="sc-13vopkh-23 cwzfIs">
                <a
                  class="avatar-user "
                  href="/profile"
                >
                  <img src="https://avatar-ex-swe.nixcdn.com/avatar/2021/10/27/f/1/3/6/1635320107970.jpg" />
                </a>
              </div>
              <div class="sc-13vopkh-3 fwzauO">
                <div class="sc-13vopkh-25 ePHKxx">
                  <a
                    class="__3dot-content username"
                    title={{userNameView}}
                    href="/profile"
                  >
                    {userNameView}
                  </a>
                </div>
              </div>
            </div>
            {userNameView && <div className="sc-13vopkh-0 pyaEd">
              <ButtonDropdown isOpen={isOpen} toggle={toggle}>
                <DropdownToggle caret>
                  <div className="wpfkci-0 fRifvS ic_setting_normal"></div>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Đổi mật khẩu</DropdownItem>
                  <DropdownItem onClick={() => {
                    logoutFunc()
                  }}>Đăng xuất</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </div>
            }
          </div>
          <div className="sc-13vopkh-11 fLQZhp">
            <div className="sc-13vopkh-12 geiIEW">
              <ul style={{ paddingLeft: "16px" }}>
                {layoutRouter.map((el) => {
                  return (
                      <NavItem style={{marginRight: '10px'}}>
                        <NavLink to={el.path}>{el.title}</NavLink>
                      </NavItem>
                  );
                })}
                {
                  userNameView && <NavItem style={{marginRight: '10px'}}>
                    <NavLink to={'/profile'}>Trang cá nhân</NavLink>
                  </NavItem>
                }
                {(role === 'ADMIN') &&
                <NavItem style={{marginRight: '10px'}}>
                  <NavLink to={'/admin'}>Quản lý admin</NavLink>
                </NavItem>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
