import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { ShapingCartImage } from "../../assets";
import ProfileHamburgerMenu from "./ProfileHambargerMenu";
import { useNavigate } from "react-router-dom";
function NavbarForHomePage() {
  const navigate = useNavigate();
  return (
    <div className="container-fluid position-sticky">
      <div className="navbar-for-home-page-and-it-is-for-desktop-parent-container">
        <div className="navbar-for-home-page-and-it-is-for-desktop-child-container">
          <img
            onClick={() => navigate("/")}
            className="common-pointer"
            src="https://bitpastel.io/mi/rammoy/construction1/static/media/anekLogo.c810fb9408aac869b7b39b1191a51509.svg"
            alt="main logo image"
          />
        </div>
        <div className="navbar-for-home-page-and-it-is-for-desktop-child-container">
          <Link
            onClick={() => {
              navigate("/");
              window.scrollTo(0, 0);
            }}
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

          <div className="dropdown common-container-for-border-right">
            <button
              data-mdb-button-init
              data-mdb-ripple-init
              data-mdb-dropdown-init
              className="btn  dropdown-toggle "
              type="button"
              id="dropdownMenuButton"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              PAGES
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a className="dropdown-item" href="#QuickOrder">
                  QUICK ORDER
                </a>
              </li>
            </ul>
          </div>
          <img
            onClick={() => navigate("/cart")}
            className="common-pointer common-container-for-border-right"
            src={ShapingCartImage}
            alt="Shopping cart image for navbar"
          />
          <ProfileHamburgerMenu />
        </div>
      </div>
    </div>
  );
}

export default NavbarForHomePage;
