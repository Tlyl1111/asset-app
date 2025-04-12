import React from "react";
import "../styles/VerticalSidebar.css";

function VerticalSidebar() {
  return (
    <div className="vertical-sidebar">
      <div className="bars">
        <div className="bar long"></div>
        <div className="bar short"></div>
      </div>
      <div className="sidebar-text">DASHBOARD</div>
    </div>
  );
}

export default VerticalSidebar;
