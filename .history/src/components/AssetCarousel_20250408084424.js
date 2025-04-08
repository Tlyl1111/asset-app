import "../styles/AssetCarousel.css";
import { useRef, useEffect, useState } from "react";

const CARD_WIDTH = 260;
const CARD_SPACING = 80; // cách xa ra chút để rõ hiệu ứng
const DEPTH = 100;
const ROTATION = 30;

const AssetCarousel = ({ assets }) => {
  const scrollRef = useRef();
  const [scrollX, setScrollX] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    setContainerWidth(container.offsetWidth);

    const handleScroll = () => {
      setScrollX(container.scrollLeft);
    };

    // Auto scroll về item gần nhất sau khi dừng
    let timeout;
    const handleScrollEnd = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const index = Math.round(
          (container.scrollLeft + container.offsetWidth / 2 - CARD_WIDTH / 2) /
            CARD_SPACING
        );
        const newScrollLeft =
          index * CARD_SPACING - container.offsetWidth / 2 + CARD_WIDTH / 2;
        container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
      }, 100);
    };

    container.addEventListener("scroll", handleScroll);
    container.addEventListener("scroll", handleScrollEnd);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("scroll", handleScrollEnd);
    };
  }, []);

  return (
    <div className="carousel-scroll-wrapper" ref={scrollRef}>
      <div className="carousel-3d-scroll">
        {assets.map((asset, i) => {
          const itemCenter = i * CARD_SPACING + CARD_WIDTH / 2;
          const viewportCenter = scrollX + containerWidth / 2;
          const distance = (itemCenter - viewportCenter) / CARD_SPACING;

          const isCenter = Math.abs(distance) < 0.5;
          const scale = 1 + Math.max(0, 0.3 - Math.abs(distance) * 0.3);
          const rotateY = distance * -ROTATION;
          const translateZ = -Math.abs(distance) * DEPTH;

          return (
            <div
              key={asset.id}
              className="carousel-card-continuous"
              style={{
                transform: `
                  rotateY(${rotateY}deg)
                  translateZ(${translateZ}px)
                  scale(${scale})
                `,
                zIndex: 1000 - Math.abs(Math.round(distance)),
                opacity: isCenter ? 1 : 0.5,
              }}
            >
              <div className="card-content">
                {asset.label && <span className="tag">{asset.label}</span>}
                <h3>{asset.title}</h3>
                <p>{asset.subtitle}</p>
                <img src={asset.image} alt={asset.title} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssetCarousel;
