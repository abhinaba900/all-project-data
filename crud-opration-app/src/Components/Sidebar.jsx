import React from "react";
import "./Css/Sidebar.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { AuthContext } from "../AuthContext/AuthContext";
function SideMenu({ isAdmin }) {
  const { active, setActive, setClickAndActiveUser, setClickAndActiveGroup } =
    React.useContext(AuthContext);

  return (
    <div className="main-sidebar-wrapper">
      <div>
        <button
          className={`btn btn-secondary  ${
            active === "Dashboard" ? "active-btn" : ""
          }`}
          type="button"
          name="Dashboard"
          onClick={() => {
            setActive("Dashboard");
            setClickAndActiveUser([]);
            setClickAndActiveGroup([]);
          }}
        >
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
          onClick={() => {
            setActive("Users");
            setClickAndActiveUser([]);
            setClickAndActiveGroup([]);
          }}
        >
          Users
        </button>
      </div>
      <div className="dropdown">
        <button
          className={`btn btn-secondary ${
            active === "Media" ? "active-btn" : ""
          }`}
          type="button"
          aria-expanded="false"
          onClick={() => {
            setActive("Media");
            setClickAndActiveUser([]);
            setClickAndActiveGroup([]);
          }}
        >
          Media
        </button>
      </div>
      <div className="dropdown">
        <button
          className={`btn btn-secondary ${
            active === "Group" ? "active-btn" : ""
          }`}
          type="button"
          aria-expanded="false"
          onClick={() => {
            setActive("Group");
            setClickAndActiveUser([]);
            setClickAndActiveGroup([]);
          }}
        >
          Group
        </button>
      </div>
      <div className="dropdown">
        <button
          className={`btn btn-secondary ${
            active === "Massages" ? "active-btn" : ""
          }`}
          type="button"
          aria-expanded="false"
          onClick={() => {
            setActive("Massages");
            setClickAndActiveUser([]);
            setClickAndActiveGroup([]);
          }}
        >
          Massages
        </button>
      </div>
    </div>
  );
}

export default SideMenu;
