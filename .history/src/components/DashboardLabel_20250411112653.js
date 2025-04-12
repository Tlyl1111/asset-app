import React from "react";
import "../styles/DashboardLabel.css";

function DashboardLabel() {
  return (
    <div className="dashboard-label">
      <div className="bar-group">
        <div className="bar bar-long" />
        <div className="bar bar-short" />
      </div>
      <div className="text">DASHBOARD</div>
      <button className="plus-button" onClick={() => alert("Thêm mới tài sản")}>
        +
      </button>
    </div>
  );
}

export default DashboardLabel;
