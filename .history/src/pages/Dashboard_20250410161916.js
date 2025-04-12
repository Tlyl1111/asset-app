import React, { useState, useEffect } from "react";
import AssetCarousel from "../components/AssetCarousel";
import { fetchAssets } from "../assets/assetService";
import { useNavigate } from "react-router-dom";
import "../styles/DashBoard.css"; 
import DashboardLabel from "../components/DashboardLabel"; 


function Dashboard() {
  const [assets, setAssets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      fetchAssets().then(setAssets);
    }
  }, [navigate]);

  const calculateDepreciationRate = () => {
    if (assets.length === 0) return 0;

    const totalValue = assets.reduce((sum, a) => sum + a.value, 0);
    const totalCurrent = assets.reduce((sum, a) => sum + a.currentValue, 0);
    const depreciation = ((totalValue - totalCurrent) / totalValue) * 100;

    return depreciation.toFixed(1); // ví dụ: 15.3%
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <p className="title-sub gradient-text">WELCOM!</p>
        <h2 className="title-main gradient-text">YOUR ASSET LIST</h2>
      </div>

      <div className="carousel-wrapper">
        <AssetCarousel assets={assets} />
      </div>

      {/* ✅ Phần dưới cùng */}
      <div className="dashboard-footer">
        <DashboardLabel />
        <div className="footer-card analysed-card">
          <p className="value">{calculateDepreciationRate()}%</p>
          <p className="label">CURRENT VALUE</p>
        </div>
        <button className="plus-button">+</button>
      </div>
    </div>
  );
}

export default Dashboard;
