import React from "react";
import "./Css/Dashboard.scss";
import { AuthContext } from "../authContext/AuthContext";
import { FaArrowRight, FaUserCheck } from "react-icons/fa";
import { MdOutlineStackedBarChart } from "react-icons/md";

function Dashboard() {
  const { active, setActive, allUsers } = React.useContext(AuthContext);

  return (
    <div className="dashboard">
      <div className="dashboard-wrapper">
        <div className="dashboard-info">
          <div className="heading-holder">
            <div>
              <h2>{allUsers?.users?.length}</h2>
              <h2>Member</h2>
            </div>
            <FaUserCheck className="heading-icon" />
          </div>
          <div className="dashboard-btn">
            <p onClick={() => setActive("Users")}>
              View Users <FaArrowRight />
            </p>
          </div>
        </div>
        <div className="dashboard-info">
          <div className="heading-holder">
            <div>
              <h2>{allUsers?.books?.length}</h2>
              <h2>Books</h2>
            </div>
            <MdOutlineStackedBarChart className="heading-icon" />
          </div>
          <div className="dashboard-btn">
            <p onClick={() => setActive("Books")}>
              View Books <FaArrowRight />
            </p>
          </div>
        </div>
        <div className="dashboard-info">
          <div className="heading-holder">
            <div>
              <h2>
                {
                  allUsers?.allRecords?.filter(
                    (record) => record?.active === true
                  ).length
                }
              </h2>
              <h2>Active Records</h2>
            </div>
            <MdOutlineStackedBarChart className="heading-icon" />
          </div>
          <div className="dashboard-btn">
            <p onClick={() => setActive("Open Records")}>
              View Records <FaArrowRight />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
