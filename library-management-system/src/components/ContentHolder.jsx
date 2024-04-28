import React from "react";
import SidebarSection from "./SidebarSection";
import "./Css/ContentHolder.scss";
import { AuthContext } from "../authContext/AuthContext";
import Dashboard from "./Dashboard";
import UsersSection from "./UsersSection";
import BooksSection from "./BooksSection";
import OpenRecordSection from "./OpenRecordSection";
import CloseRecordSection from "./CloseRecordSection";
import { Navigate } from "react-router-dom";

function ContentHolder() {
  const { active, login } = React.useContext(AuthContext);
  if (!login) {
    return <Navigate to="/" />;
  }
  return (
    <div className="content-holder">
      <SidebarSection />
      {active === "Dashboard" && <Dashboard />}
      {active === "Users" && <UsersSection />}
      {active === "Books" && <BooksSection />}
      {active === "Open Records" && <OpenRecordSection />}
      {active === "Close Records" && <CloseRecordSection />}
    </div>
  );
}

export default ContentHolder;
