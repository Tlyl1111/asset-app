import "../styles/AssetCarousel.css";
import { useState } from "react";
import { useGesture } from "@use-gesture/react";
import { animated } from "@react-spring/web";

const AssetCarousel = ({ assets }) => {
  const [index, setIndex] = useState(0);

  const bind = useGesture({
    onDrag: ({ direction: [xDir], last }) => {
      if (last) {
        const newIndex = index - Math.sign(xDir);
        setIndex(Math.max(0, Math.min(assets.length - 1, newIndex)));
      }
    },
  });

  return (
    <div className="carousel-3d-final" {...bind()}>
      {assets.map((asset, i) => {
        const offset = i - index;

        return (
          <animated.div
            key={asset.id}
            className="carousel-card-final"
            style={{
              transform: `
                translateX(${offset * 65}px)
                translateZ(${-Math.abs(offset) * 50}px)
                rotateY(${offset * 18}deg)
              `,
              zIndex: 100 - Math.abs(offset),
              opacity: offset === 0 ? 1 : 0.6,
            }}
          >
            <img src={asset.image} alt={asset.name} />
          </animated.div>
        );
      })}
    </div>
  );
};

export default AssetCarousel;
