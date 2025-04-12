import React from "react";
import "../styles/DashboardLabel.css";

function DashboardLabel() {
  return (
    <div className="dashboard-label-inline">
      <div className="bar long" />
      <div className="bar short" />
      <div className="label-text">DASHBOARD</div>
    </div>
  );
}

export default DashboardLabel;
