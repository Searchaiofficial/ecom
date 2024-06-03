import React, { useState } from "react";
import "./imagecaresoul.css";
import Image from "next/image";

import { selectProductImages } from "../Features/Slices/imageDataSlice";
import { useSelector } from "react-redux";
const Carousel = () => {
  const data = useSelector(selectProductImages);
  const images = data[0]?.images;
  console.log(data)
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const goToPrevSlide = () => {
    let index = activeIndex;
    let length = images.length;
    if (index < 1) {
      index = length - 1;
    } else {
      index--;
    }
    goToSlide(index);
  };

  const goToNextSlide = () => {
    let index = activeIndex;
    let length = images.length;
    if (index === length - 1) {
      index = 0;
    } else {
      index++;
    }
    goToSlide(index);
  };

  const [touchPosition, setTouchPosition] = useState(null);

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      goToNextSlide();
    }

    if (diff < -5) {
      goToPrevSlide();
    }

    setTouchPosition(null);
  };

  return (
    <section aria-label="Newest Photos" className="sm:hidden h-fit">
      <div
        className="relative aspect-square w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="relative flex h-full w-full items-center justify-center aspect-square">
          {images && images.length > 1 ? (
            images?.map((src, idx) => {
              return (
                <div key={idx}>
                  <Image
                    src={src}
                    alt="NA"
                    height={400}
                    width={400}
                    className={
                      activeIndex === idx ? "aspect-square w-[400px]" : "hidden"
                    }
                  />
                </div>
              );
            })
          ) : (
            <div className="h-full w-full aspect-square flex items-center justify-center">
              Loading...
            </div>
          )}

          <span className="flex absolute bottom-[16px]">
            {images?.map((_, idx) => {
              return (
                <button
                  key={idx}
                  className={
                    activeIndex === idx
                      ? "bg-white h-[0.4rem] w-[0.4rem] rounded-[50%] mr-1"
                      : "bg-[#cccc] h-[0.4rem] w-[0.4rem] rounded-[50%] mr-1"
                  }
                  onClick={() => goToSlide(idx)}
                ></button>
              );
            })}
          </span>


          <div className="z-50" onClick={goToPrevSlide}>

            <Image
              src="/ayatrio icon/left-card.svg"
              height={20}
              width={20}
              alt="arrow"

              className="absolute left-3 h-8 w-8 top-1/2 opacity-70"
            // className="absolute filter drop-shadow-sm w-7 h-7  text-white opacity-85 group hover:cursor-pointer hover:opacity-100 hover:scale-104 hover:filter-drop-shadow-lg  arrow-left"
            />
          </div>


          <div className="z-50" onClick={goToNextSlide}>
            <Image
              src="/ayatrio icon/right-card.svg"
              height={30}
              width={30}
              alt="arrow"

              className="absolute right-3 top-1/2 h-8 w-8  opacity-70"
            // className="absolute filter drop-shadow-sm w-7 h-7 -mt-[13px] text-white opacity-85 group hover:cursor-pointer hover:opacity-100 hover:scale-104 hover:filter-drop-shadow-lg arrow-right"
            />

          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
