import "../styles/AssetCarousel.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AssetCarousel = ({ assets }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(prev + 1, assets.length - 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="carousel-3d-layered">
      <button className="nav-button left" onClick={handlePrev}>
        ←
      </button>
      <button className="nav-button right" onClick={handleNext}>
        →
      </button>

      {assets.map((asset, index) => {
        const offset = index - activeIndex;

        return (
          <div
            key={asset.id}
            className="carousel-card-layered"
            style={{
              transform: `
                translateX(${offset * 60}px)
                translateZ(${Math.abs(offset) * -40}px)
                rotateY(${offset * 15}deg)
              `,
              zIndex: 100 - Math.abs(offset),
              opacity: offset === 0 ? 1 : 0.6,
            }}
            onClick={() => navigate(`/asset/${asset.id}`)}
          >
            <img src={asset.image} alt={asset.name} />
          </div>
        );
      })}
    </div>
  );
};

export default AssetCarousel;
