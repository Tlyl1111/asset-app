// src/App.js
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AssetDetails from "./pages/AssetDetails";
import AssetFormPage from "./pages/AssetFormPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/"; // import cái mới

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
        <Route
          path="/asset/:id"
          element={
            <ProtectedRoute>
              <AssetDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/form/:id?"
          element={
            <ProtectedRoute>
              <AssetFormPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
