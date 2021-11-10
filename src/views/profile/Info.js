import React, {Component, useEffect, useState} from "react";
import "../../styles/info.css";
import {
  CardBody,
  Navbar,
  Card,
  CardTitle,
  Collapse,
  NavItem,
  CardImg,
  Nav,
  NavLink, TabContent, TabPane
} from "reactstrap";
import classnames from "classnames";
import Song from "./Song";
import Album from "./Album";
import Playlist from "./Playlist";

const Info = ({userView}) => {
  const [logo, setLogo] = useState(null)
  const [name, setName] = useState(null)
  const [isSinger, setIsSinger] = useState(false)

  const [activeTab, setActiveTab] = useState('1')

  const clickTag = tab => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  useEffect(() => {
    setActiveTab('1')
    setLogo(userView?.image || null)
    setName(userView?.name || null)
    if (userView?.isSinger === 1) {
      setIsSinger(true)
    } else setIsSinger(false)
  }, [userView])

    return (
        <>
          <div className="content-info">
            <Card>
              {
                logo ? <CardImg
                        alt="Card image cap"
                        src={logo}
                        top
                        className="user-img"
                    /> :
                    <CardImg
                        alt="Card image cap"
                        src='/imgs/logo.png'
                        top
                        className="user-img"
                    />
              }
              <CardBody>
                <CardTitle tag="h5">{name}</CardTitle>
              </CardBody>
            </Card>

            <Navbar expand="md" light className="nav navbar-nav navbar-center">
              <Collapse navbar>
                <Nav className="me-auto" navbar>
                  <NavItem className="nav-item">
                    <NavLink className={classnames({active: activeTab === '1'})}
                             onClick={() => {
                               clickTag('1')
                             }}> TONG QUAN</NavLink>
                  </NavItem>
                  {
                    isSinger && <>
                      <NavItem className="nav-item">
                        <NavLink className={classnames({active: activeTab === '2'})} onClick={() => {
                          clickTag('2')
                        }}>SONG</NavLink>
                      </NavItem>
                      <NavItem className="nav-item">
                        <NavLink  className={classnames({active: activeTab === '3'})} onClick={() => {
                          clickTag('3')
                        }}>ALBUM</NavLink>
                      </NavItem>
                    </>
                  }
                  <NavItem className="nav-item">
                    <NavLink className={classnames({active: activeTab === '4'})} onClick={() => {
                      clickTag('4')
                    }}>PLAYLIST</NavLink>
                  </NavItem>
                  <NavItem className="nav-item">
                    <NavLink className={classnames({active: activeTab === '5'})} onClick={() => {
                      clickTag('5')
                    }}>YEU THICH</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
            <CardBody>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <>ABC</>
                </TabPane>
              </TabContent>
              {
                isSinger && <>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="2">
                      <Song/>
                    </TabPane>
                  </TabContent>

                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="3">
                      <Album/>
                    </TabPane>
                  </TabContent>
                </>
              }
              <TabContent activeTab={activeTab}>
                <TabPane tabId="4">
                  <Playlist/>
                </TabPane>
              </TabContent>
            </CardBody>
          </div>
        </>
    );
}

export default Info;
