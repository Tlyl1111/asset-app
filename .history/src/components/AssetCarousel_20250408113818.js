import "../styles/AssetCarousel.css";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { useState } from "react";

const CARD_SPACING = 65;
const DEPTH = 80;
const ROTATION = 15;

const AssetCarousel = ({ assets }) => {
  const maxDrag = 0;
  const minDrag = -(assets.length - 1) * CARD_SPACING;

  const [startX, setStartX] = useState(0); // giữ vị trí trước khi kéo
  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  const bind = useGesture({
    onDrag: ({ movement: [mx], last }) => {
      let newX = startX + mx;

      // Clamp trong khoảng kéo được
      newX = Math.min(maxDrag, Math.max(minDrag, newX));

      if (last) {
        // Snap về index gần nhất
        const snappedIndex = Math.round(-newX / CARD_SPACING);
        const clampedIndex = Math.min(
          assets.length - 1,
          Math.max(0, snappedIndex)
        );
        const snappedX = -clampedIndex * CARD_SPACING;

        api.start({ x: snappedX, config: { tension: 300, friction: 30 } });
        setStartX(snappedX);
      } else {
        api.start({ x: newX });
      }
    },
  });

  return (
    <div className="carousel-3d-continuous" {...bind()}>
      {assets.map((asset, i) => (
        <animated.div
          key={asset.id}
          className="carousel-card-continuous"
          style={{
            transform: x.to((val) => {
              const offset = i + val / CARD_SPACING;
              return `
        translateX(${-offset * CARD_SPACING}px)
        translateZ(${offset * -DEPTH}px)
        rotateY(${-offset * ROTATION}deg)
      `;
            }),
            zIndex: 100 - i,
          }}
        >
          <img src={asset.image} alt={asset.name} />
          <div className="carousel-card-details">
            <h3>{asset.name}</h3>
            <p>{asset.description}</p>
            <span>{asset.price}</span>
          </div>
        </animated.div>
      ))}
    </div>
  );
};

export default AssetCarousel;