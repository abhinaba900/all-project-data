import React from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { HeatPhone } from "../assets";
import { useNavigate } from "react-router-dom";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTelegram,
  FaWhatsapp,
  FaTwitter,
  FaYoutube,

} from "react-icons/fa";

function MobileNavbarIcon() {
  const [active, setActive] = React.useState(false); // Set initial state to false
  const navigate = useNavigate();

  const toggleMenu = () => {
    setActive(!active); // Toggle the active state
  };
  return (
    <div>
      <GiHamburgerMenu fontSize={40} cursor={"pointer"} onClick={toggleMenu} />

      <div className={`hamburger-menu-2 ${active ? "active" : ""}`}>
        <IoMdClose fontSize={30} cursor={"pointer"} onClick={toggleMenu} />
        <div className="navbar-for-home-page-and-it-is-for-desktop-child-container">
          <Link
            onClick={() => window.scrollTo(0, 0)}
            className="common-container-for-links-in-react-router"
          >
            HOME
          </Link>
          <a
            href={"#scrollToElement"}
            className="common-container-for-links-in-react-router"
          >
            SHOP
          </a>
        </div>
        <div className="details-container-for-mobile-navbar">
          <img src={HeatPhone} alt="" />
          <div>
            <h2>Get Quick Support</h2>
            <h1>236-799-5500</h1>
          </div>
        </div>

        <div className="details-container-for-mobile-navbar-2">
          <h2>
            {" "}
            Latest Updates Get Upto 45% Off The Best Construction Equipment
            Deals At Antek
          </h2>
          <h2>Mon - Sat 9.00 - 18.00</h2>
          <h2>Favorites</h2>
        </div>
        <div className="social-icons-container">
          <FaFacebookSquare />
          <FaInstagramSquare />
          <FaTelegram />
          <FaWhatsapp />
          <FaTwitter />
          <FaYoutube />
        </div>
      </div>
    </div>
  );
}

export default MobileNavbarIcon;
