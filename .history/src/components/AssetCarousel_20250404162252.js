import "../styles/AssetCarousel.css";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";

const CARD_SPACING = 65;
const DEPTH = 80;
const ROTATION = 15;

const AssetCarousel = ({ assets }) => {
  const maxDrag = 0; // vị trí đầu (bên phải)
  const minDrag = -(assets.length - 1) * CARD_SPACING; // vị trí cuối (bên trái)

  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  const bind = useGesture({
    onDrag: ({ offset: [ox] }) => {
      const clampedX = Math.min(maxDrag, Math.max(minDrag, ox));
      api.start({ x: clampedX });
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
