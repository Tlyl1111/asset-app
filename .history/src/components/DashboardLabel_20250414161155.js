import React, { useState } from "react";
import "../styles/DashboardLabel.css";
import AssetForm from "./AssetForm"; // Nhớ import AssetForm

function DashboardLabel({ onAddClick }) {
  // const [showForm, setShowForm] = useState(false);

  // const handleAddClick = () => {
  //   setShowForm(true);
  // };

  // const handleCloseForm = () => {
  //   setShowForm(false);
  // };

  return (
    <>
      <div className="dashboard-label">
        <div className="bar-group">
          <div className="bar bar-long" />
          <div className="bar bar-short" />
        </div>
        <div className="text">DASHBOARD</div>
        {/* <button className="plus-button" onClick={handleAddClick}> */}
          +
        </button>
      </div>

      {/* Khi showForm === true thì render AssetForm */}
      {showForm && <AssetForm onClose={handleCloseForm} />}
    </>
  );
}

export default DashboardLabel;
