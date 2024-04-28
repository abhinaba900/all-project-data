import React from "react";
import MatFitLogo from "../assets/images/home/MadFit-logo.svg";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="container navbar">
      <img className="logo-img" onClick={() => navigate("/")} src={MatFitLogo} alt="main logo" />
      <div className="nav-links">
        <Link
          style={{ cursor: "pointer", fontWeight: "bold", color: "#6B816F" }}
          to={"/trainer biographies"}
          className="link-all"
        >
          TRAINER BIOGRAPHIES
        </Link>
        <Link
          style={{ cursor: "pointer", fontWeight: "bold", color: "#6B816F" }}
          to={"/app features"}
          className="link-all"
        >
          APP FEATURE
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
