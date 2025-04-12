import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchAssetById,
  addAsset,
  updateAsset,
} from "../assets/assetService.js";
import "../styles/AssetForm.css";

function AssetForm({ onClose }) {
  const [name, setName] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [notes, setNotes] = useState("");
  const { id } = useParams();

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
    onClose(); // Gọi đóng form sau khi submit thành công
  };

  return (
    <div className="asset-form-overlay">
      <form onSubmit={handleSubmit} className="asset-form-container">
        <h2 className="asset-form-title">Add activity</h2>

        <label className="asset-form-label">Add task</label>
        <input
          type="text"
          placeholder="Tên tài sản"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="asset-form-input"
        />

        <label className="asset-form-label">Purchase Date</label>
        <input
          type="date"
          value={purchaseDate}
          onChange={(e) => setPurchaseDate(e.target.value)}
          className="asset-form-input"
        />

        <label className="asset-form-label">Value</label>
        <input
          type="number"
          placeholder="Giá trị"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="asset-form-input"
        />

        <label className="asset-form-label">Description</label>
        <textarea
          placeholder="Mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="asset-form-textarea"
        />

        <label className="asset-form-label">Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="asset-form-file"
        />

        <label className="asset-form-label">Notes</label>
        <textarea
          placeholder="Ghi chú"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="asset-form-textarea"
        />

        <div className="asset-form-actions">
          <button type="submit" className="asset-form-submit">
            {id ? "Cập nhật" : "Thêm mới"}
          </button>
        </div>

        <button type="button" onClick={onClose} className="asset-form-close">
          ✕
        </button>
      </form>
    </div>
  );
}

export default AssetForm;
