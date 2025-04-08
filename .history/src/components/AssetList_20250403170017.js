import React from "react";
import AssetItem from "./AssetItem";

function AssetList({ assets, onDelete }) {
  return (
    <div>
      <ul>
        {assets.map((asset) => (
          <AssetItem key={asset.id} asset={asset} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}

export default AssetList;
