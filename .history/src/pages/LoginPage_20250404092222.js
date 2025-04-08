// src/pages/LoginPage.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [privateKey, setPrivateKey] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (privateKey === "yourPrivateKey") {
      // Kiểm tra private key ở đây
      localStorage.setItem("isAuthenticated", "true"); // Lưu thông tin xác thực
      navigate("/"); // Chuyển hướng về trang Dashboard
    } else {
      alert("Private key không chính xác!");
    }
  };

  return (
    <div className="login-container">
      <h2>Đăng nhập</h2>
      <input
        type="text"
        value={privateKey}
        onChange={(e) => setPrivateKey(e.target.value)}
        placeholder="Nhập private key"
      />
      <button onClick={handleLogin}>Đăng nhập</button>
    </div>
  );
}

export default LoginPage;
