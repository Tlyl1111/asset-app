import React, { useState } from "react";
import "../styles/DashboardLabel.css";
import AssetForm from "./AssetForm"; // Đảm bảo đường dẫn đúng

function DashboardLabel() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="dashboard-label">
      <div className="bar-group">
        <div className="bar bar-long" />
        <div className="bar bar-short" />
      </div>
      <div className="text">DASHBOARD</div>
      <button className="plus-button" onClick={() => setShowForm(true)}>
        +
      </button>

      {showForm && <AssetForm onClose={() => setShowForm(false)} />}
    </div>
  );
}

export default DashboardLabel;
