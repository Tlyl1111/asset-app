import "../styles/AssetCarousel.css";
import { useRef, useEffect, useState } from "react";

const CARD_WIDTH = 220;
const CARD_SPACING = 65; // Giữ như cũ
const DEPTH = 80;
const ROTATION = 15;
const distance = (itemCenter - viewportCenter) / CARD_SPACING;

const isCenter = Math.abs(distance) < 0.5;
const scale = 1 + Math.max(0, 0.3 - Math.abs(distance) * 0.3);
const rotateY = distance * -ROTATION;
const translateZ = -Math.abs(distance) * DEPTH;


const AssetCarousel = ({ assets }) => {
  const scrollRef = useRef();
  const [scrollX, setScrollX] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const handleScroll = () => {
    setScrollX(scrollRef.current.scrollLeft);
  };

  useEffect(() => {
    const container = scrollRef.current;
    setContainerWidth(container.offsetWidth);
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="carousel-scroll-wrapper" ref={scrollRef}>
      <div className="carousel-3d-scroll">
        {assets.map((asset, i) => {
          const itemCenter = i * CARD_SPACING + CARD_WIDTH / 2;
          const viewportCenter = scrollX + containerWidth / 2;
          const distance = (itemCenter - viewportCenter) / CARD_SPACING;

          const isCenter = Math.abs(distance) < 0.5;
          const scale = 1 + Math.max(0, 0.2 - Math.abs(distance) * 0.2);
          const zIndex = 1000 - Math.abs(Math.round(distance));

          return (
            <div
              key={asset.id}
              className="carousel-card-continuous"
              style={{
                transform: `
                translateZ(${distance * -DEPTH}px)
                rotateY(${distance * -ROTATION}deg)
                scale(${scale})
              `,
                zIndex: zIndex,
                opacity: isCenter ? 1 : 0.8,
              }}
            >
              <img src={asset.image} alt={asset.name} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssetCarousel;
