import React, { useState, useContext } from "react";
import { WalletContext } from "../context/WalletContext";

function LoginPage() {
  const [key, setKey] = useState("");
  const { loginWithPrivateKey, account } = useContext(WalletContext);

  const handleLogin = () => {
    try {
      loginWithPrivateKey(key);
      alert("Đăng nhập thành công!");
    } catch (e) {
      alert("Private key không hợp lệ!");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🔐 Đăng nhập bằng Private Key</h2>
      <input
        type="password"
        placeholder="Nhập private key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />
      <button onClick={handleLogin}>Đăng nhập</button>

      {account && <p>🟢 Đã đăng nhập: {account.address}</p>}
    </div>
  );
}

export default LoginPage;
