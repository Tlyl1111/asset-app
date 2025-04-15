import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAssetById } from "../assets/assetService";
import "../styles/AssetDetails.css";
import { WalletContext } from "../context/WalletContext";
import { CONTRACT_ABI } from "../blockchain/contractABI"; // Để sử dụng ABI
import { CONTRACT_ADDRESS } from "../blockchain/contractAddress";

function AssetDetails({ id, onClose, onEdit }) {
  const [asset, setAsset] = useState([]);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();
  const { web3, account } = useContext(WalletContext); 

  useEffect(() => {
    const loadAsset = async () => {
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
      try {
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        const assetData = await contract.methods
          .getAssetDetails(id)
          .call({ from: account.address });
        let asset = serializeBigInt(assetData);
         asset = {
          name: asset.name,
          purchaseDate: new Date(
          asset.purchaseDate * 1000
        ).toLocaleDateString(),
          value: asset.value,
          description: asset.description,
          image: asset.imageURL, // Đảm bảo hợp lệ trong smart contract
          notes: asset.note,
        };
        
        
        setAsset(asset);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu tài sản:", error);
      }
    };
    loadAsset();
  }, [id, web3, account]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      if (onClose) onClose(); // ✅ Gọi đúng callback từ cha (AssetCarousel)
    }, 300);
  };

  const handleEdit = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose(); 
      onEdit(id); 
    }, 300);
  };
  

  if (!asset) return <div>Loading...</div>;

  return (
    <div className="asset-modal-overlay">
      <div className={`asset-modal-content ${isClosing ? "slide-down" : ""}`}>
        <button className="close-button" onClick={handleClose}>
          ✖
        </button>

        <div className="asset-content">
          <div className="asset-info">
            <h2>{asset.name}</h2>
            <div className="asset-meta">
              <div className="meta-item">
                <div className="meta-label">Ngày mua</div>
                <div className="meta-value">{asset.purchaseDate}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Giá trị</div>
                <div className="meta-value">
                  {new Intl.NumberFormat("vi-VN").format(asset.value)} đ
                </div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Mô tả</div>
                <div className="meta-value">{asset.description}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Ghi chú</div>
                <div className="meta-value">{asset.notes}</div>
              </div>
            </div>

            <div className="action-buttons">
              <button className="edit-button" onClick={handleEdit}>
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => alert("Bạn muốn xóa tài sản này!")}
              >
                Delete
              </button>
            </div>
          </div>

          <div className="asset-image-wrapper">
            <img className="asset-image" src={asset.image} alt={asset.name} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetDetails;
