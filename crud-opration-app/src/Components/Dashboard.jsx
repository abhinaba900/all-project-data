import React, { useState, useEffect } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { AiFillDashboard } from "react-icons/ai";
import {
  FaUserCheck,
  FaUserAltSlash,
} from "react-icons/fa";

function Dashboard() {
  const [arr, setArr] = useState([
    "Total Users",
    "Active Users",
    "Inactive Users",
  ]);
  const [logos, setLogos] = useState([
    <AiFillDashboard />,
    <FaUserCheck />,
    <FaUserAltSlash />,
  ]);
  const { allData } = React.useContext(AuthContext);
  const [targets, setTargets] = useState([
    allData.length,
    allData.filter((data) => data.active === true).length,
    allData.filter((data) => data.active === false).length,
  ]);
  const [currentCounts, setCurrentCounts] = useState([0, 0, 0]);

  useEffect(() => {
    setTargets([
      allData.length,
      allData.filter((data) => data.active === true).length,
      allData.filter((data) => data.active === false).length,
    ]);
  }, [allData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCounts((prevCounts) =>
        prevCounts.map((count, index) => {
          const target = targets[index];
          return count < target ? count + 1 : count;
        })
      );
    }, 250);

    return () => clearInterval(interval);
  }, [targets]);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-data">
        {arr.map((item, index) => (
          <div key={index} className="data">
            <p>{item}</p>
            <h2 className="data-info">
              <p>{currentCounts[index]}</p>
              <i>{logos[index]}</i>
            </h2>
            <div className="more-info"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
