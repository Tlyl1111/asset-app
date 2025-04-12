import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAssetById } from "../assets/assetService";
import "../styles/AssetDetails.css"; // 👈 Thêm CSS riêng

function AssetDetails() {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAsset = async () => {
      const asset = await fetchAssetById(id);
      setAsset(asset);
    };
    loadAsset();
  }, [id]);

  if (!asset) return <div>Loading...</div>;

  const handleEdit = () => {
    navigate(`/form/${id}`);
  };

  return (
    <div className="asset-details-container">
      <div className="asset-info">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
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
      </div>

      <div className="asset-image-wrapper">
        <img className="asset-image" src={asset.image} alt={asset.name} />
      </div>
      <button className="edit-button" onClick={handleEdit}>
        Edit
      </button>
    </div>
  );
}

export default AssetDetails;
