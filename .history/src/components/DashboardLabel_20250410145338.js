import React from "react";
import "../styles/DashboardLabel.css";

function DashboardLabel() {
  return (
    <div className="dashboard-label">
      <div className="dashboard-bars">
        <div className="bar long" />
        <div className="bar short" />
      </div>
      <div className="dashboard-text">DASHBOARD</div>
    </div>
  );
}

export default DashboardLabel;
