import React from "react";
import MobileNavbarIcon from "./MobileNavbarIcon";
import { useNavigate, Link } from "react-router-dom";

import { ShapingCartImage } from "../assets";
import ProfileHamburgerMenu from "./homePageComponents/ProfileHambargerMenu";

function MobileNavbar() {
  const navigate = useNavigate();

  return (
    <div className="mobile-navbar">
      <MobileNavbarIcon />
      <div className="navbar-for-home-page-and-it-is-for-desktop-child-container">
        <img
          onClick={() => navigate("/")}
          className="common-pointer"
          src="https://bitpastel.io/mi/rammoy/construction1/static/media/anekLogo.c810fb9408aac869b7b39b1191a51509.svg"
          alt="main logo image"
        />
      </div>
      <div className="navbar-for-home-page-and-it-is-for-desktop-child-container">
        <img
          onClick={() => navigate("/cart")}
          className="common-pointer common-container-for-border-right"
          src={ShapingCartImage}
          alt="Shopping cart image for navbar"
        />
      </div>
        <ProfileHamburgerMenu />
    </div>
  );
}

export default MobileNavbar;
