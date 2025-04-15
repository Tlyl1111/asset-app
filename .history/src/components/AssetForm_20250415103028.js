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

function AssetForm({ id, onClose, reloadAssets }) {
  const [name, setName] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [notes, setNotes] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const { web3, account, privateKey } = useContext(WalletContext);

  const cloudinaryUrl =
    "https://api.cloudinary.com/v1_1/dta5lkfxr/image/upload";
  const cloudinaryUploadPreset = "imageurl";

  const serializeBigInt = (obj) => {
    const result = {};
    for (const key in obj) {
      if (typeof obj[key] === "bigint") {
        result[key] = obj[key].toString();
      } else {
        result[key] = obj[key];
      }
    }
    return result;
  };

  useEffect(() => {
    if (id && web3 && account) {
      const loadAsset = async () => {
        try {
          const contract = new web3.eth.Contract(
            CONTRACT_ABI,
            CONTRACT_ADDRESS
          );
          const assetData = await contract.methods
            .getAssetDetails(id)
            .call({ from: account.address });

          let asset = serializeBigInt(assetData);

          // Gán lại dữ liệu từ smart contract vào state form
          setName(asset.name);
          setPurchaseDate(
            new Date(asset.purchaseDate * 1000).toISOString().split("T")[0] // đúng format YYYY-MM-DD
          );
          setValue(asset.value);
          setDescription(asset.description);
          setImage(asset.imageURL); // string URL
          setNotes(asset.note);
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu tài sản:", error);
        }
      };
      loadAsset();
    }
  }, [id, web3, account]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      
    } else {
      try {
        const formData = new FormData();
        formData.append("file", image);
        console.log("Image file:" + image);
        formData.append("upload_preset", cloudinaryUploadPreset);

        const response = await fetch(cloudinaryUrl, {
          method: "POST",
          body: formData,
        });

        const cloudinaryResponse = await response.json();
        const imageURL = cloudinaryResponse.secure_url;

        console.log("Cloudinary upload result:" + cloudinaryResponse);

        console.log("Image URL:" + imageURL);

        const timestamp = Math.floor(new Date(purchaseDate).getTime() / 1000);

        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        const txData = contract.methods
          .addAsset(name, timestamp, value, description, imageURL, notes)
          .encodeABI();

        const gas = await contract.methods
          .addAsset(name, timestamp, value, description, imageURL, notes)
          .estimateGas({ from: account.address });

        const gasPrice = await web3.eth.getGasPrice();

        const tx = {
          to: CONTRACT_ADDRESS,
          data: txData,
          gas,
          gasPrice,
          from: account.address,
        };

        const signed = await web3.eth.accounts.signTransaction(tx, privateKey);
        const receipt = await web3.eth.sendSignedTransaction(
          signed.rawTransaction
        );
        alert("Success");
        console.log(receipt);
      } catch (err) {
        console.error(err);
        alert("Failure");
      }
    }
    reloadAssets?.();
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

        <label className="asset-form-label">Add name</label>
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
