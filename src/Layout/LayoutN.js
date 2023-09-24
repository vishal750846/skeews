import React from "react";

import { json, Navigate, Outlet } from "react-router-dom";
import Header from "../components/header";
import AdminSideBar2 from "../components/AdminSideBar2";
import Footer from "../components/footer";
import ExportApi from "../api/ExportApi";
const LayoutN = () => {
  const [hide, setHide] = useState();
  const hideData = (data) => {
    setHide(data);
  };
  <>
    <Header hideData={hideData} />
    <div className="d-flex">
      <div className="main-content">
        <Outlet />
      </div>
    </div>
    {/* <Footer /> */}
  </>;
};

export default LayoutN;
