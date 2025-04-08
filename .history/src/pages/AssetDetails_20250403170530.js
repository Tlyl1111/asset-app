import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchAssetById } from "../";

function AssetDetails() {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);

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
