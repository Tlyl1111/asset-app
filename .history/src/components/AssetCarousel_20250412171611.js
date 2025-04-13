import "../styles/AssetCarousel.css";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { useEffect, useCallback, useState } from "react";
import AssetDetails from "../pages/AssetDetails";
import AssetForm from "./AssetForm";
import useEmblaCarousel from "@e"

// const CARD_SPACING = 65;
// const DEPTH = 80;
// const ROTATION = 15;

const AssetCarousel = ({ assets }) => {
  
  const [selectedAssetId, setSelectedAssetId] = useState(null); // 👈 ID được chọn
  const [formAssetId, setFormAssetId] = useState(null); 

  // const maxDrag = 0;
  // const minDrag = -(assets.length - 1) * CARD_SPACING;

  // const [startX, setStartX] = useState(0);
  // const [{ x }, api] = useSpring(() => ({ x: 0 }));

  
  // const bind = useGesture({
  //   onDrag: ({ movement: [mx], last }) => {
  //     let newX = startX + mx;
  //     newX = Math.min(maxDrag, Math.max(minDrag, newX));

  //     if (last) {
  //       const snappedIndex = Math.round(-newX / CARD_SPACING);
  //       const clampedIndex = Math.min(
  //         assets.length - 1,
  //         Math.max(0, snappedIndex)
  //       );
  //       const snappedX = -clampedIndex * CARD_SPACING;

  //       api.start({ x: snappedX, config: { tension: 300, friction: 30 } });
  //       setStartX(snappedX);
  //     } else {
  //       api.start({ x: newX });
  //     }
  //   },
  // });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [scrollProgress, setScrollProgress] = useState(0);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("scroll", onScroll);
    onScroll();
  }, [emblaApi, onScroll]);

  const handleCardClick = (id) => {
    setSelectedAssetId(id); // 👈 chọn asset để hiển thị
  };

  const handleCloseDetails = () => {
    setSelectedAssetId(null); // 👈 tắt form
  };

  const handleOpenForm = (id) => {
    setFormAssetId(id); // có thể là `null` (add mới) hoặc có `id` (edit)
    setSelectedAssetId(null); // đóng AssetDetails
  };

  const handleCloseForm = () => {
    setFormAssetId(null);
  };

  return (
    <>
      {/* <div className="carousel-3d-continuous" {...bind()}>
        {assets.map((asset, i) => (
          <animated.div
            key={asset.id}
            className="carousel-card-continuous"
            onClick={() => handleCardClick(asset.id)} // 👈 click là show details
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
      </div> */}

      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {assets.map((asset) => (
              <div className="embla__slide" key={asset.id}>
                <div className="embla__slide__inner">
                  <img
                    className="embla__slide__img"
                    src={asset.image}
                    alt={asset.name}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="embla__progress">
          <div
            className="embla__progress__bar"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>
      </div>

      {/* Hiển thị AssetDetails nếu chọn card */}
      {selectedAssetId && (
        <AssetDetails
          id={selectedAssetId}
          onClose={handleCloseDetails}
          onEdit={handleOpenForm} // 👈 THÊM CALLBACK edit
        />
      )}

      {formAssetId !== null && (
        <AssetForm id={formAssetId} onClose={handleCloseForm} />
      )}
    </>
  );
};

export default AssetCarousel;
