import React, { useState, useEffect } from "react";
import AssetCarousel from "../components/AssetCarousel";
import { fetchAssets } from "../assets/assetService";
import { useNavigate } from "react-router-dom";
import "../styles/DashBoard.css"; // thêm css riêng cho giao diện này

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

  return (
      </div>

      <div className="bottom-bar">
        <img src="/images/avatar.png" alt="Avatar" className="icon-round" />
        <img src="/images/protect1.png" className="icon" />
        <img src="/images/protect2.png" className="icon" />
        <button className="btn-plus">+</button>
      </div>
    </div>
  );
}

export default Dashboard;
