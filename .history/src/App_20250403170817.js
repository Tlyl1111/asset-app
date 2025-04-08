import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AssetDetails from "./pages/AssetDetails";
import AssetFormPage from "./"
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/asset/:id" element={<AssetDetails />} />
      </Routes>
    </div>
  );
}

export default App;
