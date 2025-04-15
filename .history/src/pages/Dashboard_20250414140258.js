import React, { useState, useEffect, useContext } from "react";
import AssetCarousel from "../components/AssetCarousel";
import "../styles/DashBoard.css"; 
import AssetForm from "../components/";
import { WalletContext } from "../context/WalletContext";
import DashboardLabel from "../components/DashboardLabel"; 
import { CONTRACT_ABI } from "../blockchain/contractABI";
import { CONTRACT_ADDRESS } from "../blockchain/contractAddress";

function Dashboard() {
  const [assets, setAssets] = useState([]);
  const { web3, account } = useContext(WalletContext);

  const serializeBigInt = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === "bigint") {
        obj[key] = obj[key].toString();
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        serializeBigInt(obj[key]);
      }
    }
    return obj;
  };

  const fetchAssets = async () => {
    try {
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      const userAssets = await contract.methods
        .getUserAssets()
        .call({ from: account.address });

      const fullAssets = await Promise.all(
        userAssets.map(async (_, index) => {
          let asset = await contract.methods
            .getAssetDetails(index)
            .call({ from: account.address });
          asset = serializeBigInt(asset);
          return {
            id: index,
            name: asset.name,
            value: parseInt(asset.value),
            currentValue: parseInt(asset.value),
            description: asset.description,
            imageURL: asset.imageURL,
            note: asset.note,
            purchaseDate: new Date(
              asset.purchaseDate * 1000
            ).toLocaleDateString(),
          };
        })
      );

      setAssets(fullAssets);
    } catch (err) {
      console.error("Lỗi khi load danh sách tài sản:", err);
    }
  };

  useEffect(() => {
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
        <AssetCarousel assets={assets} reloadAssets={fetchAssets} />
        <button onClick={() => setShowForm(true)} className="add-asset-button">
          + Add Asset
        </button>
      </div>

      {showForm && (
        <AssetForm
          onClose={() => {
            setShowForm(false);
            fetchAssets();
          }}
          reloadAssets={fetchAssets}
        />
      )}

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
