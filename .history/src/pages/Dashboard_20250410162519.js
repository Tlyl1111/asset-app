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

  const calculateCurrentPercentage = () => {
    if (assets.length === 0) return 0;

    const totalValue = assets.reduce((sum, a) => sum + a.value, 0);
    const totalCurrent = assets.reduce((sum, a) => sum + a.currentValue, 0);

    const percent = (totalCurrent / totalValue) * 100;
    return percent.toFixed(1);
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
        <div
          className="footer-card analysed-card"
          style={{
            background: `linear-gradient(to top, #e0f7e9 ${calculateCurrentPercentage()}%, #ffffff ${calculateCurrentPercentage()}%)`,
          }}
        >
          <p className="value">{calculateCurrentPercentage()}%</p>
          <p className="label">CURRENT VALUE</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
