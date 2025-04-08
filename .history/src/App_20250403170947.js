import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AssetDetails from "./pages/AssetDetails";
import AssetFormPage from "./pages/AssetFormPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/asset/:id" element={<AssetDetails />} />
        <Route path="/form/:id?" element={<AssetFormPage />} />
      </Routes>
    </div>
  );
}

export default App;
