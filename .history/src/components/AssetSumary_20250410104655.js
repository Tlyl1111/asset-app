import React from "react";
import "../styles/";

function AssetSummary({ errorRate }) {
  return (
    <div className="summary-container">
      <div className="summary-item insured">
        <p className="summary-value">100%</p>
        <p className="summary-label">INSURED</p>
      </div>
      <div className="summary-item error">
        <p className="summary-value">{errorRate}%</p>
        <p className="summary-label">DEPRECIATION</p>
      </div>
    </div>
  );
}

export default AssetSummary;
