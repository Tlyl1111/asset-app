import React, { useState, useEffect, useContext } from "react";
import "../styles/AssetDetails.css";
import { WalletContext } from "../context/WalletContext";
import { CONTRACT_ABI } from "../blockchain/contractABI"; 
import { CONTRACT_ADDRESS } from "../blockchain/contractAddress";

function AssetDetails({ id, onClose, onEdit, reloadAssets }) {
  const [asset, setAsset] = useState([]);
  const [isClosing, setIsClosing] = useState(false);
  const { web3, account, privateKey } = useContext(WalletContext);

  useEffect(() => {
    console.log(id);
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

  const handleDelete = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa tài sản này?")) return;

    try {
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      const gasPrice = await web3.eth.getGasPrice();
      const gasLimit = await contract.methods
        .deleteAsset(id)
        .estimateGas({ from: account.address });

      const tx = {
        to: CONTRACT_ADDRESS,
        data: contract.methods.deleteAsset(id).encodeABI(),
        gas: gasLimit,
        gasPrice: gasPrice,
        from: account.address,
      };

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );

      console.log("Asset deleted successfully:", receipt);
      alert("Tài sản đã được xóa!");
      reloadAssets?.();
      handleClose();
    } catch (error) {
      console.error("Lỗi khi xóa tài sản:", error);
      alert("Có lỗi xảy ra khi xóa tài sản.");
    }
  };

  return (
    <div className="asset-modal-overlay">
      <div className={`asset-modal-content ${isClosing ? "slide-down" : ""}`}>
        <button className="close-button" onClick={handleClose}>
          ✖
        </button>

        <div className="dashboard-header">
          <p className="title-main gradient-text">So, this is the best offer</p>
          <h2 className="title-main gradient-text">Y</h2>
        </div>

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
              <button className="delete-button" onClick={handleDelete}>
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
