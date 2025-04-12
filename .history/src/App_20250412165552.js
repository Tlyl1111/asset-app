// src/App.js
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AssetDetails from "./pages/AssetDetails";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute"; // import cái mới

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Các route được bảo vệ */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </div>
  );
}

export default App;
