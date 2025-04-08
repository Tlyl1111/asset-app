import React, { useState, useEffect } from "react";
import AssetList from "../components/AssetList";
import { fetchAssets, deleteAsset } from "../assets";

function Dashboard() {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAssets = async () => {
      const data = await fetchAssets();
      setAssets(data);
    };

    getAssets();
  }, []);

  const handleDelete = async (id) => {
    await deleteAsset(id);
    setAssets(assets.filter((asset) => asset.id !== id));
  };

  const filteredAssets = assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.purchaseDate.includes(search)
  );

  return (
    <div>
      <h2>Danh Sách Tài Sản</h2>
      <input
        type="text"
        placeholder="Tìm kiếm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <AssetList assets={filteredAssets} onDelete={handleDelete} />
    </div>
  );
}

export default Dashboard;
