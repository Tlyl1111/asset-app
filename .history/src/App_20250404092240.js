import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AssetDetails from "./pages/AssetDetails";
import AssetFormPage from "./pages/AssetFormPage";
import LoginPage from "./pages/LoginPage"; // Import LoginPage

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/asset/:id" element={<AssetDetails />} />
        <Route path="/form/:id?" element={<AssetFormPage />} />
        <Route path="/login" element={<LoginPage />} />{" "}
        {/* Thêm route cho LoginPage */}
      </Routes>
    </div>
  );
}

export default App;
