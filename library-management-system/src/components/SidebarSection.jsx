import React from "react";
import "./Css/SidebarSection.scss";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaUser, FaBook } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoLogOut } from "react-icons/io5";
import { AuthContext } from "../authContext/AuthContext";
import { useNavigate } from "react-router-dom";
function SidebarSection() {
  
  const { active, setActive,  setLogin } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("login");
    navigate("/");
    setLogin(false);
  };
  return (
    <div className="sidebar">
      <div className="main-sidebar-wrapper">
        <div>
          <button
            className={`btn btn-secondary  ${
              active === "Dashboard" ? "active-btn" : ""
            }`}
            type="button"
            name="Dashboard"
            onClick={() => setActive("Dashboard")}
          >
            <AiOutlineDashboard className="icons" />
            Dashboard
          </button>
        </div>
        <div>
          <button
            className={`btn btn-secondary ${
              active === "Users" ? "active-btn" : ""
            }`}
            type="button"
            name="Users"
            onClick={() => setActive("Users")}
          >
            <FaUser className="icons" />
            Users
          </button>
        </div>
        <div>
          <button
            className={`btn btn-secondary ${
              active === "Books" ? "active-btn" : ""
            }`}
            type="button"
            aria-expanded="false"
            onClick={() => setActive("Books")}
          >
            <FaBook className="icons" />
            Books
          </button>
        </div>
        <div>
          <button
            className={`btn btn-secondary ${
              active === "Open Records" ? "active-btn" : ""
            }`}
            type="button"
            aria-expanded="false"
            onClick={() => setActive("Open Records")}
          >
            <RxHamburgerMenu className="icons" />
            Open Records
          </button>
        </div>
        <div>
          <button
            className={`btn btn-secondary ${
              active === "Close Records" ? "active-btn" : ""
            }`}
            type="button"
            aria-expanded="false"
            onClick={() => setActive("Close Records")}
          >
            <RxHamburgerMenu className="icons" />
            Close Records
          </button>
        </div>
        <div>
          <button
            className={`btn btn-secondary ${
              active === "Logout" ? "active-btn" : ""
            }`}
            type="button"
            aria-expanded="false"
            onClick={handleLogout}
          >
            <IoLogOut className="icons" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default SidebarSection;
