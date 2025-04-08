import "../styles/AssetCarousel.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGesture } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";

const AssetCarousel = ({ assets }) => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const bind = useGesture({
    onDrag: ({ direction: [xDir], distance, last }) => {
      if (last) {
        const newIndex = index - Math.sign(xDir);
        setIndex(Math.max(0, Math.min(assets.length - 1, newIndex)));
      }
    },
  });

  return (
    <div className="carousel-3d-corrected" {...bind()}>
      {assets.map((asset, i) => {
        const offset = i - index;

        return (
          <animated.div
            key={asset.id}
            className="carousel-card-corrected"
            style={{
              transform: `
                translateX(${offset * 50}px)
                translateZ(${-Math.abs(offset) * 60}px)
                rotateY(${offset * 20}deg)
              `,
              zIndex: 100 - Math.abs(offset),
              opacity: offset === 0 ? 1 : 0.6,
            }}
            onClick={() => navigate(`/asset/${asset.id}`)}
          >
            <img src={asset.image} alt={asset.name} />
          </animated.div>
        );
      })}
    </div>
  );
};

export default AssetCarousel;
