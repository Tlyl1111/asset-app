import React, { useState } from "react";
import "../styles/AssetCarousel.css";

function AssetCarousel({ assets }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction) => {
    if (direction === "left" && currentIndex < assets.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === "right" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleDrag = (e) => {
    const startX = e.clientX || e.touches[0].clientX;
    const onMove = (moveEvent) => {
      const moveX = moveEvent.clientX || moveEvent.touches[0].clientX;
      if (moveX - startX > 50) {
        handleSwipe("right");
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("touchmove", onMove);
      } else if (moveX - startX < -50) {
        handleSwipe("left");
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("touchmove", onMove);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
  };

  return (
    <div
      className="carousel-container"
      onMouseDown={handleDrag}
      onTouchStart={handleDrag}
    >
      <div
        className="carousel-inner"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {assets.map((asset, index) => (
          <div
            key={index}
            className={`carousel-card ${
              index === currentIndex ? "active" : ""
            }`}
          >
            <div className="service-tag">TIME FOR SERVICE</div>
            <div className="car-info">
              <h3>{asset.name}</h3>
              <p>{asset.model}</p>
              <img src={asset.image} alt={asset.name} className="car-image" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AssetCarousel;
