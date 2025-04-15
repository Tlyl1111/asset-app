import React, { useState, useEffect, useContext } from "react";
import AssetCarousel from "../components/AssetCarousel";
import "../styles/DashBoard.css"; 
import { WalletContext } from "../context/WalletContext";
import DashboardLabel from "../components/DashboardLabel"; 
import { CONTRACT_ABI } from "../blockchain/contractABI";
import { CONTRACT_ADDRESS } from "../blockchain/contractAddress";

function Dashboard() {
  const [assets, setAssets] = useState([]);
  const { web3, account } = useContext(WalletContext);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        const result = await contract.methods
          .getUserAssets()
          .call({ from: account.address });
        setAssets(
          result.map((item, index) => ({
            id: idx,
            name: item.name,
            value: item.value,
            description: item.description,
            imageURL: item.imageURL,
            note: item.note,
            purchaseDate: new Date(
              item.purchaseDate * 1000
            ).toLocaleDateString(),
          }))
        );
      } catch (err) {
        console.error("Lỗi khi load danh sách tài sản:", err);
      }
    };

    if (web3 && account) fetchAssets();
  }, [web3, account]);

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
              background: "rgba(105, 103, 103, 0.18)",
              border: "1px solid #ccc",
            }}
          >
            <p
              className="value"
              style={{
                color: "rgb(0, 0, 0)",
              }}
            >
              100%
            </p>
            <p
              className="label"
              style={{
                color: "rgb(0, 0, 0)",
              }}
            >
              VALUE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
