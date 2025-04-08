import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchAssetById,
  addAsset,
  updateAsset,
} from "../assets/";

function AssetForm() {
  const [name, setName] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [notes, setNotes] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const loadAsset = async () => {
        const asset = await fetchAssetById(id);
        setName(asset.name);
        setPurchaseDate(asset.purchaseDate);
        setValue(asset.value);
        setDescription(asset.description);
        setImage(asset.image);
        setNotes(asset.notes);
      };
      loadAsset();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const asset = { name, purchaseDate, value, description, image, notes };
    if (id) {
      await updateAsset(id, asset);
    } else {
      await addAsset(asset);
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tên tài sản"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="date"
        value={purchaseDate}
        onChange={(e) => setPurchaseDate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Giá trị"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <textarea
        placeholder="Mô tả"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <textarea
        placeholder="Ghi chú"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button type="submit">{id ? "Cập nhật" : "Thêm mới"}</button>
    </form>
  );
}

export default AssetForm;
