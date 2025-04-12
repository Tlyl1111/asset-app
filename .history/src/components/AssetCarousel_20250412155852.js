import "../styles/AssetCarousel.css";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 thêm dòng này

const CARD_SPACING = 65;
const DEPTH = 80;
const ROTATION = 15;

const AssetCarousel = ({ assets }) => {
  const maxDrag = 0;
  const minDrag = -(assets.length - 1) * CARD_SPACING;

  const [startX, setStartX] = useState(0);

  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  const navigate = useNavigate(); // 👈 tạo navigate

  const bind = useGesture({
    onDrag: ({ movement: [mx], last }) => {
      let newX = startX + mx;
      newX = Math.min(maxDrag, Math.max(minDrag, newX));

      if (last) {
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

  const [showForm, setShowForm] = useState(false);
  
    const handleAddClick = () => {
      setShowForm(true);
    };

  return (
    <div className="carousel-3d-continuous" {...bind()}>
      {assets.map((asset, i) => (
        <animated.div
          key={asset.id}
          className="carousel-card-continuous"
          onClick={{ handleAddClick }} // 👈 chỉ cần click là chuyển
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
