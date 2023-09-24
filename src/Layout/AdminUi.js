import React, { useState } from "react";
import AdminSideBar from "../components/AdminSideBar";
import AdminTopBar from "../components/AdminTopBar";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/header";
const AdminUi = () => {
  const [token, setToken] = useState(localStorage.getItem("admin"));
  const [hide, setHide] = useState();
  const hideData = (data) => {
    setHide(data);
  };
  return token ? (
    <>
      {" "}
      <Header hideData={hideData} />
      <div className="d-flex">
        <AdminSideBar />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default AdminUi;
