import React, { Component } from "react";
import "../styles/info.css";

class info extends Component {
  render() {
    return (
      <>
        <h1>Info</h1>
        <div className="container">
          <div className="img">
            <img src="https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-600x600.jpg"  width="300px"/>
            
          </div>
          <div className="info">
            <h1>Min</h1>
            <p> Singer</p>
            <p>Hit : We dont talk any more</p>
            <p>Album : love yourselt</p>
          </div>
        </div>
      </>
    );
  }
}

export default info;
