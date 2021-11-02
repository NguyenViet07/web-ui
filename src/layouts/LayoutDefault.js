import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import RightSidebar from "../components/layout/RightSidebar";

const LayoutDefault = ({ children, layoutRouter }) => (
  <>
    <main className="site-content">{children}</main>
    <Footer />
    <RightSidebar />
  </>
);

export default LayoutDefault;
