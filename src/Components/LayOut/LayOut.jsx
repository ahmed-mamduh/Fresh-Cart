import React from "react";
import styles from "./LayOut.module.css";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

import { Outlet, useNavigate } from "react-router-dom";
export default function LayOut({ userData, setUserData }) {
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login");
  }
  return (
    <>
      <NavBar userData={userData} logOut={logOut} />
      <Outlet />
      <Footer />
    </>
  );
}
