import NavBar from "../../components/admin/NavBar";
import React from "react";

const Index = ({ data }) => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <NavBar />
            <div>Màn hình admin</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
