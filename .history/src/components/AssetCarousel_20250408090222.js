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
      const clampedX = Math.min(maxDrag, Math.max(minDrag, startX + mx));
      api.start({ x: clampedX });

      if (last) {
        setStartX(clampedX); // cập nhật khi kéo xong
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
              return 
                translateX(${-offset * CARD_SPACING}px)
                translateZ(${offset * -DEPTH}px)
                rotateY(${-offset * ROTATION}deg)
              ;
            }),
            zIndex: 100 - i,
          }}
        >
          <img src={asset.image} alt={asset.name} />
        </animated.div>
      ))}
    </div>
  );
};

export default AssetCarousel;