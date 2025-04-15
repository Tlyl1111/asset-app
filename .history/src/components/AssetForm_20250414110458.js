import React, { useState, useEffect, useContext } from "react";
import {
  fetchAssetById,
  addAsset,
  updateAsset,
} from "../assets/assetService.js";
import "../styles/AssetForm.css";
import { WalletContext } from "../context/WalletContext";
import { CONTRACT_ABI } from "../blockchain/contractABI";
import { CONTRACT_ADDRESS } from "../blockchain/contractAddress";

function AssetForm({ id, onClose }) {
  const [name, setName] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [notes, setNotes] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const { web3, account, privateKey } = useContext(WalletContext);
  
  const cloudinaryUrl =
    "https://api.cloudinary.com/v1_1/dta5lkfxr/image/upload";
  const cloudinaryUploadPreset = "imageurl";

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
    try {
      
      const formData = new FormData();
      formData.append("file", imageFile);
      console.log("Image file:" + imageFile);
      formData.append("upload_preset", cloudinaryUploadPreset);

      const response = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      const cloudinaryResponse = await response.json();
      const imageURL = cloudinaryResponse.secure_url;
      
      console.log("Cloudinary upload result:" + cloudinaryResponse);

      console.log("Image URL:" + imageURL);

       const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
       const timestamp = Math.floor(new Date(purchaseDate).getTime() / 1000);
       const tx = contract.methods.addAsset(
         name,
         timestamp,
         value,
         description,
         imageURL,
         notes
       );

       const gas = await tx.estimateGas({ from: account.address });
       const gasPrice = await web3.eth.getGasPrice();

       const signed = await web3.eth.accounts.signTransaction(
         {
           to: CONTRACT_ADDRESS,
           data: tx.encodeABI(),
           gas,
           gasPrice,
         },
         privateKey
       );

       const receipt = await web3.eth.sendSignedTransaction(
         signed.rawTransaction
       );
       alert("✅ Thêm tài sản thành công!");
       console.log(receipt);
     } catch (err) {
       console.error(err);
       alert("❌ Thêm thất bại");
     }
    triggerClose();
  };

  const triggerClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // khớp với thời gian animation slideDown
  };

  return (
    <div className="asset-form-overlay">
      <form
        onSubmit={handleSubmit}
        className={`asset-form-container ${isClosing ? "slide-down" : ""}`}
      >
        <div className="form-drag-bar"></div>
        <h2 className="asset-form-title gradient-text">Add activity</h2>

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
        <div className="custom-file-wrapper">
          <label htmlFor="file-upload" className="custom-file-button">
            Choose File
          </label>
          <span className="custom-file-name">
            {image?.name || "No file chosen"}
          </span>
          <input
            id="file-upload"
            type="file"
            value={description}
            onChange={(e) => setImage(e.target.files[0])}
            className="custom-file-input"
          />
        </div>

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

        <button
          type="button"
          onClick={triggerClose}
          className="asset-form-close"
        >
          ✖
        </button>
      </form>
    </div>
  );
}

export default AssetForm;
