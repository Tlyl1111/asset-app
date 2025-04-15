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
    <div>
      <h2>Đăng nhập bằng Private Key</h2>
      <input
        type="password"
        placeholder="Nhập private key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <button onClick={handleLogin}>Đăng nhập</button>

      {account && <p>🟢 Đã đăng nhập: {account.address}</p>}
    </div>
  );
}

export default LoginPage;
