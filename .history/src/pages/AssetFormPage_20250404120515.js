import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import AssetForm from "../components/AssetForm";

function AssetFormPage() {
  const { id } = useParams();
   const navigate = useNavigate();
  return (
    <div>
      <h2>{id ? "Chỉnh sửa tài sản" : "Thêm mới tài sản"}</h2>
      <AssetForm id={id} />
    </div>
  );
}

export default AssetFormPage;
