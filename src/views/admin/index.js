import NavBar from "../../components/admin/NavBar";
import React from "react";

const Index = ({ data }) => {
  return (
    <>
      <div className="container">
        <div className="row">
            <NavBar />
            <p>Content Admin</p>
        </div>
      </div>
    </>
  );
};

export default Index;
