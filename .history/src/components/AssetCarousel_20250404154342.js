import "../styles/AssetCarousel.css";
import { useNavigate } from "react-router-dom";

const AssetCarousel = ({ assets }) => {
  const navigate = useNavigate();

  return (
    <div className="carousel-3d-layered">
      {[...assets].reverse().map((asset, index) => (
        <div
          className="carousel-card-layered"
          key={asset.id}
          style={{
            transform: `rotateY(35deg) translateX(-${
              index * 60
            }px) translateZ(-${index * 40}px)`,
            zIndex: assets.length - index,
          }}
          onClick={() => navigate(`/asset/${asset.id}`)}
        >
          <img src={asset.image} alt={asset.name} />
        </div>
      ))}
    </div>
  );
};

export default AssetCarousel;
