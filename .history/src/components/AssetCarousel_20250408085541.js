import React, { useState } from "react";
import "./AssetCarousel.css";
import assets from "../assets";

const AssetCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDrag = (direction) => {
    setActiveIndex((prev) =>
      direction === "left"
        ? Math.max(prev - 1, 0)
        : Math.min(prev + 1, assets.length - 1)
    );
  };

  return (
    <div className="carousel-container">
      <div className="insurance-text">
        Your asset insured level is <span>100%</span>
      </div>

      <div className="carousel-wrapper">
        {assets.map((asset, index) => {
          const offset = index - activeIndex;
          return (
            <div
              key={asset.id}
              className={`carousel-card ${offset === 0 ? "active" : ""}`}
              style={{
                transform: `translateX(${offset * 60}%) scale(${
                  offset === 0 ? 1 : 0.85
                }) rotateY(${offset * -15}deg)`,
                zIndex: assets.length - Math.abs(offset),
                opacity: Math.abs(offset) > 2 ? 0 : 1,
              }}
              onClick={() => setActiveIndex(index)}
            >
              <div className="card-tag">TIME FOR SERVICE</div>
              <div className="card-title">{asset.name}</div>
              <div className="card-subtitle">{asset.description}</div>
              <img src={asset.image} alt={asset.name} className="card-image" />
            </div>
          );
        })}
      </div>

      <div className="carousel-nav">
        <button onClick={() => handleDrag("left")}>‹</button>
        <button onClick={() => handleDrag("right")}>›</button>
      </div>
    </div>
  );
};

export default AssetCarousel;
