import React from "react";
import "./DashboardLabel.css";

function DashboardLabel() {
  return (
    <div className="dashboard-label">
      <div className="bar long"></div>
      <div className="bar short"></div>
      <span className="text">DASHBOARD</span>
    </div>
  );
}

export default DashboardLabel;
