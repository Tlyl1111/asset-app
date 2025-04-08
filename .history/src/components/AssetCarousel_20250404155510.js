import "../styles/AssetCarousel.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGesture } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";

const AssetCarousel = ({ assets }) => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const [springProps, api] = useSpring(() => ({
    x: 0,
    config: { tension: 300, friction: 25 },
  }));

  const bind = useGesture({
    onDrag: ({ offset: [x], last }) => {
      const newIndex = Math.round(x / 220); // ✅ kéo sang phải là index giảm
      if (last) {
        setIndex((prev) =>
          Math.max(0, Math.min(assets.length - 1, prev - newIndex))
        );
      }
    },
  });

  return (
    <div className="carousel-3d-drag" {...bind()}>
      {assets.map((asset, i) => {
        const offset = i - index;
        return (
          <animated.div
            key={asset.id}
            className="carousel-card-3d"
            style={{
              transform: `
                translateX(${-offset * 60}px)
                translateZ(${Math.abs(offset) * -40}px)
                rotateY(${-offset * 15}deg)
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
