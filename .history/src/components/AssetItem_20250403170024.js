import React from "react";
import { Link } from "react-router-dom";

function AssetItem({ asset, onDelete }) {
  return (
    <li>
      <h3>{asset.name}</h3>
      <p>{asset.purchaseDate}</p>
      <p>{asset.value}</p>
      <Link to={`/asset/${asset.id}`}>Chi tiết</Link>
      <button onClick={() => onDelete(asset.id)}>Xóa</button>
    </li>
  );
}

export default AssetItem;
