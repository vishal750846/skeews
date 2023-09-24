import React, { useEffect, useRef, useState } from "react";
import {Navigate, Outlet } from "react-router-dom";
import Header from "../components/header";
import AdminSideBar2 from "../components/AdminSideBar2";
const UseUi = () => {
  const [token, setToken] = useState(localStorage.getItem("tokenuser"));
  const [hide, setHide] = useState();
  const [Data, setData] = useState();

  const ref = useRef();
  const hideData = (data) => {
    setHide(data);
  };
  useEffect(() => {}, []);
  const HendleSerch = () => {};
  return token ? (
    <>
      <Header hideData={hideData} />
      <div className="d-flex">
        <AdminSideBar2 />
        <div className="main-content">
          <Outlet ref={ref} data={Data} />
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default UseUi;
