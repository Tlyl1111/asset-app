import React from "react";
import "../styles/DashboardLabel.css";

function DashboardLabel() {
  return (
    <div className="dashboard-label">
      <div className="dashboard-bars">
        <div className="bar long"></div>
        <div className="bar short"></div>
      </div>
      <div className="dashboard-text">
        {"DASHBOARD".split("").map((char, i) => (
          <span key={i}>{char}</span>
        ))}
      </div>
    </div>
  );
}

export default DashboardLabel;
