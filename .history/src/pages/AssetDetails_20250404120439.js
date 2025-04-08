import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAssetById } from "../assets/assetService";

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

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Quay lại</button>
      <h2>{asset.name}</h2>
      <p>Ngày mua: {asset.purchaseDate}</p>
      <p>Giá trị: {asset.value}</p>
      <p>Mô tả: {asset.description}</p>
      <img src={asset.image} alt={asset.name} />
      <p>Ghi chú: {asset.notes}</p>
    </div>
  );
}

export default AssetDetails;
