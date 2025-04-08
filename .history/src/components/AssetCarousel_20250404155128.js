import "../styles/AssetCarousel.css";
import { useGesture } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AssetCarousel = ({ assets }) => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const bind = useGesture({
    onDrag: ({ offset: [x], last }) => {
      const newIndex = Math.round(-x / 250); // điều chỉnh độ nhạy
      if (last) {
        setIndex(Math.max(0, Math.min(assets.length - 1, newIndex)));
      }
      api.start({ x: -index * 250 });
    },
  });

  const [springProps, api] = useSpring(() => ({
    x: 0,
    config: { tension: 300, friction: 30 },
  }));

  return (
    <div className="carousel-3d-drag" {...bind()}>
      {assets.map((asset, i) => {
        const offset = i - index;
        return (
          <animated.div
            key={asset.id}
            className="carousel-card-3d"
            style={{
              transform: springProps.x.to(
                () =>
                  `translateX(${offset * 60}px)
                 translateZ(${Math.abs(offset) * -40}px)
                 rotateY(${offset * 15}deg)`
              ),
              zIndex: 100 - Math.abs(offset),
              opacity: offset === 0 ? 1 : 0.65,
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
