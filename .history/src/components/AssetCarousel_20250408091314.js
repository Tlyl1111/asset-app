import React, { useState } from "react";
import "../styles/AssetCarousel.css";

function AssetCarousel({ assets }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleWheel = (e) => {
    if (e.deltaY > 0 && currentIndex < assets.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="carousel-3d-container" onWheel={handleWheel}>
      {assets.map((asset, index) => {
        const offset = index - currentIndex;
        return (
          <div
            key={index}
            className="carousel-3d-card"
            style={{
              transform: `translateX(${offset * 60}%) scale(${
                offset === 0 ? 1 : 0.8
              }) rotateY(${offset * -30}deg)`,
              zIndex: 100 - Math.abs(offset),
              opacity: offset === 0 ? 1 : 0.5,
            }}
          >
            <div className="service-tag">TIME FOR SERVICE</div>
            <h3>{asset.name}</h3>
            <img src={asset.image} alt={asset.name} className="car-image" />
          </div>
        );
      })}
    </div>
  );
}

export default AssetCarousel;
