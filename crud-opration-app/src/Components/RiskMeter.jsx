import React from "react";
import "./Css/RiskMeter.scss";

const RiskMeter = ({ riskScore }) => {
  const dialTurn = riskScore * 0.9;
  return (
    <div className="dashboard-meter__wrapper">
      <meter
        id="risk-meter"
        className="dashboard-meter sr-only"
        min="0"
        max="10"
        value={riskScore}
      ></meter>
      <div
        className="dashboard-meter__container"
        style={{ "--turn": dialTurn }}
      >
        <div className="dashboard-meter"></div>
        <div className="dashboard-meter__dial">
          <div className="dashboard-meter__dial-center"></div>
        </div>
      </div>
      <label htmlFor="risk-meter" className="dashboard-meter__labels">
        <span className="sr-only">Risk Level</span>
        <span aria-hidden="true">Low Risk</span>
        <span aria-hidden="true">High Risk</span>
      </label>
    </div>
  );
};

export default RiskMeter;
