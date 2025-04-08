import React from "react";
import { useParams } from "react-router-dom";
import AssetForm from "../components/AssetForm";

function AssetFormPage() {
  const { id } = useParams();

  return (
    <div>
      <h2>{id ? "Chỉnh sửa tài sản" : "Thêm mới tài sản"}</h2>
      <AssetForm id={id} />
    </div>
  );
}

export default AssetFormPage;
