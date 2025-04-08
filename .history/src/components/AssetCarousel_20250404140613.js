import "../styles/AssetCarousel.css";
import { useNavigate } from "react-router-dom";

const AssetCarousel = ({ assets }) => {
  const navigate = useNavigate();

  return (
    <div className="carousel-3d">
      {[...assets].reverse().map(
        (
          asset 
        ) => (
          <div
            className="carousel-card"
            key={asset.id}
            onClick={() => navigate(`/asset/${asset.id}`)}
          >
            <img src={asset.image} alt={asset.name} />
            <div className="carousel-info">
              <h3>{asset.name}</h3>
              <p>{asset.description}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default AssetCarousel;
