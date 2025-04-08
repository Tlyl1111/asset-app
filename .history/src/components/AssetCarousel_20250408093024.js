import "../styles/AssetCarousel.css";
import { useRef, useEffect, useState } from "react";

const CARD_WIDTH = window.innerWidth < 500 ? 180 : 220;
const CARD_SPACING = window.innerWidth < 500 ? 60 : 65;
const DEPTH = window.innerWidth < 500 ? 50 : 80;
const ROTATION = 15;

const AssetCarousel = ({ assets }) => {
  const scrollRef = useRef();
  const [scrollX, setScrollX] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  // Drag handlers
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
    scrollStart.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    scrollRef.current.scrollLeft = scrollStart.current - dx;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    scrollStart.current = scrollRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - startX.current;
    scrollRef.current.scrollLeft = scrollStart.current - dx;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const handleScroll = () => {
    setScrollX(scrollRef.current.scrollLeft);
  };

  useEffect(() => {
    const container = scrollRef.current;
    setContainerWidth(container.offsetWidth);
    container.addEventListener("scroll", handleScroll);

    // Clean up
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="carousel-scroll-wrapper"
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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
                  translateX(${i * CARD_SPACING}px)
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
