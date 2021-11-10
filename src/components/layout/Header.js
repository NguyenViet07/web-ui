import React, {useEffect, useState} from "react";
import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import {Nav, NavItem} from "reactstrap";
import {Link, NavLink} from "react-router-dom";
import {useMutation} from "react-fetching-library";
import {logoutAction} from "../../api/actions/login";
import {useHistory} from "react-router-dom";
import {findByUserName} from "../../api/actions/users";
import {useDispatch, useSelector} from "react-redux";

const Header = ({layoutRouter}) => {
    // const [userData, setUserData] = useState(null)
    const [userNameView, setUserNameView] = useState(null);
    const [role, setRole] = useState(null);
    const [userInfoView, setUserInfoView] = useState(null)
    const [logo, setLogo] = useState(null)


    const {mutate: logout} = useMutation(logoutAction);
    const {mutate: _findByUserName} = useMutation(findByUserName)


    const history = useHistory();

    const userName = useSelector((state) => state.song.userName);
    const dispatch = useDispatch()

    const getUserByUserName = async (usernameInput) => {
        const response = await _findByUserName({username: usernameInput})
        if (response.payload?.errorCode === '200') {
            setUserInfoView(response.payload?.data)
            setLogo(response.payload?.data?.image || null)
        } else {
            setUserInfoView(null)
        }
    };

    useEffect(() => {

        const userData = JSON.parse(localStorage.getItem("userData"));
        // setUserData(userData1)

        setUserNameView(userData?.user?.userName);
        setRole(userData?.role);
        getUserByUserName(userData?.user?.userName)
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const logoutFunc = async () => {
        // xoa token trong db

        await logout();
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
        history.push("/");
        const action = {
            type: 'USER_NAME',
            data: null
        }
        dispatch(action)
        setUserNameView(null)
    };

    return (
        <header id="header">
            <div className="kyusxl-58 sc-13vopkh-1 iBiofn hiOVWZ">
                <div className="sc-13vopkh-2 qIfwr">
                    <div className="sc-13vopkh-9 fioJms">
                        <figure className="m-0">
                            <a href="/" title="" className="logo">
                                <img src="/logo.jpg" alt="Logo Chiasenhac"/>
                            </a>
                        </figure>
                    </div>

                    <div class="sc-13vopkh-22 hqNQxP">
                        {!userName ? <div className="wrapper-left">
                            <p className="sc-13vopkh-30 JBcAl mb-0 ml-16px ">
                                <div style={{marginRight: "10px"}}>
                                    <NavLink to={"/login"}>Đăng nhập </NavLink>/
                                    <NavLink to={"/create"}> Đăng ký</NavLink>
                                </div>

                            </p>
                        </div> : <div className="wrapper-left">
                            <div className="sc-13vopkh-23 cwzfIs">
                                <a
                                    className="avatar-user "
                                    href="/profile"
                                >
                                    {
                                        logo ? <img src={logo}/> :
                                            <img src='/imgs/logo.png'/>
                                    }
                                </a>
                            </div>
                            <div className="sc-13vopkh-3 fwzauO">
                                <div className="sc-13vopkh-25 ePHKxx">
                                    <a
                                        className="__3dot-content username"
                                        title={{userName}}
                                        href="/profile"
                                    >
                                        {userName}
                                    </a>
                                </div>
                            </div>
                        </div>
                        }

                        {userName && <div className="sc-13vopkh-0 pyaEd">
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
                            <ul style={{paddingLeft: "16px"}}>
                                {layoutRouter.map((el) => {
                                    {
                                        if (el.title)
                                            return (
                                                <NavItem style={{marginRight: '10px'}}>
                                                    <NavLink to={el.path}>{el.title}</NavLink>
                                                </NavItem>
                                            );
                                    }

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
