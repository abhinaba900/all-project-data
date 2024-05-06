import React from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

function ProfileHamburgerMenu() {
  const [active, setActive] = React.useState(false); // Set initial state to false

  const toggleMenu = () => {
    setActive(!active); // Toggle the active state
  };

  const { name } = JSON.parse(localStorage.getItem("data") || false);

  return (
    <div>
      <img
        onClick={toggleMenu}
        className="common-image-container-for-profile-image common-pointer"
        src="https://bitpastel.io/mi/rammoy/construction1/static/media/user.9aa809c2866b44dcb9b5.jpg"
        alt="temp logo image"
      />

      <CgProfile
        fontSize={40}
        cursor={"pointer"}
        onClick={toggleMenu}
        className="mobile-navbar-button-icon"
      />

      <div className={`hamburger-menu ${active ? "active" : ""}`}>
        <IoMdClose fontSize={40} cursor={"pointer"} onClick={toggleMenu} />
        <div className="hamburger-menu-child-container">
          <img
            className="common-image-container-for-profile-image common-pointer"
            src="https://bitpastel.io/mi/rammoy/construction1/static/media/user.9aa809c2866b44dcb9b5.jpg"
            alt="temp logo image"
          />
          <p className="sub-menu-text border-dashed-border common-pointer">
            {name ? name : "Guest"}
          </p>
          <Link className="sub-menu-text border-dashed-border">Settings</Link>
          <Link className="sub-menu-text border-dashed-border">
            Order detail
          </Link>
          <Link
            className="sub-menu-text border-dashed-border"
            onClick={() => {
              localStorage.clear();
              setActive(false);
            }}
          >
            Log Out
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfileHamburgerMenu;
