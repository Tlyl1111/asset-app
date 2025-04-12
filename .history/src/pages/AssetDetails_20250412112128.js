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
          <div>
            <strong>Ngày mua:</strong> {asset.purchaseDate}
          </div>
          <div>
            <strong>Giá trị:</strong> ${asset.value}
          </div>
          <div>
            <strong>Mô tả:</strong> {asset.description}
          </div>
          <div>
            <strong>Ghi chú:</strong> {asset.notes}
          </div>
        </div>
        <button className="edit-button" onClick={handleEdit}>
          ✏️ Chỉnh sửa tài sản
        </button>
      </div>

      <div className="asset-image-wrapper">
        <img className="asset-image" src={asset.image} alt={asset.name} />
      </div>
    </div>
  );
}

export default AssetDetails;
