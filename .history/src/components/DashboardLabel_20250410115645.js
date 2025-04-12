import React from "react";
import "../styles/DashboardLabel.css";

function DashboardLabel() {
  return (
    <div className="dashboard-label">
      <div className="bar long" />
      <div className="bar short" />
      <span className="text">DASHBOARD</span>
    </div>
  );
}

export default DashboardLabel;
