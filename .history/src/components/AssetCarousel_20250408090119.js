import "../styles/AssetCarousel.css";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { useState } from "react";

const CARD_SPACING = 220; // Cập nhật spacing bằng đúng chiều rộng card để tránh chồng hình
const DEPTH = 100;
const ROTATION = 15;

const AssetCarousel = ({ assets }) => {
  const maxIndex = assets.length - 1;
  const [index, setIndex] = useState(0);
  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  const bind = useGesture({
    onDrag: ({ movement: [mx], last, direction: [dx], velocity }) => {
      const offsetX = -index * CARD_SPACING + mx;

      if (last) {
        // Swipe nhanh: chuyển tiếp 1 item nếu đủ lực
        const swipe = velocity > 0.2 ? (dx > 0 ? -1 : 1) : 0;
        const newIndex = Math.min(
          maxIndex,
          Math.max(0, index + swipe + Math.round(-mx / CARD_SPACING))
        );

        setIndex(newIndex);
        api.start({
          x: -newIndex * CARD_SPACING,
          config: { tension: 300, friction: 30 },
        });
      } else {
        api.start({ x: offsetX, immediate: true });
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
        </animated.div>
      ))}
    </div>
  );
};

export default AssetCarousel;
