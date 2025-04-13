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

    return ((totalCurrent * 100) / totalValue).toFixed(1); // ✅ đúng theo yêu cầu
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

      <div className="dashboard-footer-wrapper">
        <div className="dashboard-footer">
          <div className="footer-left">
            <DashboardLabel />
          </div>

          <div
            className="footer-card analysed-card"
            style={{
              background: `linear-gradient(to top,
                #7f7fd5 0%,
              #91eae4 ${calculateCurrentPercentage()}%,
              rgb(10, 10, 10) ${calculateCurrentPercentage()}%
            )`,
              border: "1px solid #ccc",
            }}
          >
            <p className="value">{calculateCurrentPercentage()}%</p>
            <p className="label">CURRENT VALUE</p>
          </div>
          <div
            className="footer-card analysed-card"
            style={{
              background: `linear-gradient(to top,
                #7f7fd5 0%,
              #91eae4 ${calculateCurrentPercentage()}%,
              rgb(10, 10, 10) ${calculateCurrentPercentage()}%
            )`,
              border: "1px solid #ccc",
            }}
          >
            <p className="value">100%</p>
            <p className="label">VALUE</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
