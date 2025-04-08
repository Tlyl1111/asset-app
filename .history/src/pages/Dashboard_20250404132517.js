import React, { useState, useEffect } from "react";
import AssetList from "../components/AssetList";
import AssetCarousel from "../components/AssetCarousel";
import { fetchAssets, deleteAsset } from "../assets/assetService";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Kiểm tra xem người dùng đã đăng nhập chưa
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login"); // Nếu chưa đăng nhập, chuyển hướng đến trang login
    } else {
      // Nếu đã đăng nhập, lấy danh sách tài sản
      const getAssets = async () => {
        const data = await fetchAssets();
        setAssets(data);
      };
      getAssets();
    }
  }, [navigate]);

  // const handleDelete = async (id) => {
  //   await deleteAsset(id);
  //   setAssets(assets.filter((asset) => asset.id !== id));
  // };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Xoá thông tin đăng nhập
    navigate("/login"); // Chuyển hướng về trang login
  };

  const filteredAssets = assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.purchaseDate.includes(search)
  );

  return (
    <div>
      <h2>Danh Sách Tài Sản</h2>
      <button onClick={handleLogout}>Đăng Xuất</button> {/* Nút đăng xuất */}
      <input
        type="text"
        placeholder="Tìm kiếm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <AssetCarousel assets={filteredAssets} />
    </div>
  );
}

export default Dashboard;
