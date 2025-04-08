import "../styles/AssetCarousel.css";
import { useRef, useEffect, useState } from "react";

const CARD_WIDTH = window.innerWidth < 500 ? 180 : 220;
const CARD_SPACING = window.innerWidth < 500 ? 60 : 65;
const DEPTH = window.innerWidth < 500 ? 50 : 80;
const ROTATION = 15;
const AUTO_SCROLL_INTERVAL = 3000;

const AssetCarousel = ({ assets }) => {
  const scrollRef = useRef();
  const [scrollX, setScrollX] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isDragging = useRef(false);
  const autoScrollTimer = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollX(scrollRef.current.scrollLeft);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    setContainerWidth(container.offsetWidth);
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Drag logic
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragScrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    scrollRef.current.scrollLeft = dragScrollLeft.current - dx;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e) => {
    isDragging.current = true;
    dragStartX.current = e.touches[0].clientX;
    dragScrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - dragStartX.current;
    scrollRef.current.scrollLeft = dragScrollLeft.current - dx;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    if (!assets.length || containerWidth === 0) return;

    const scrollToIndex = (index) => {
      const scrollTarget =
        index * CARD_SPACING - (containerWidth - CARD_WIDTH) / 2;

      scrollRef.current.scrollTo({
        left: scrollTarget,
        behavior: "smooth",
      });
    };

    autoScrollTimer.current = setInterval(() => {
      if (isDragging.current) return;
      const nextIndex = (currentIndex + 1) % assets.length;
      setCurrentIndex(nextIndex);
      scrollToIndex(nextIndex);
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(autoScrollTimer.current);
  }, [assets.length, containerWidth, currentIndex]);

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
      <div
        className="carousel-3d-track"
        style={{ width: `${assets.length * CARD_SPACING + CARD_WIDTH}px` }}
      >
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
                zIndex,
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
