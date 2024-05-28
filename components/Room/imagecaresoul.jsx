import React, { useState } from "react";
import "./imagecaresoul.css"; 
import Image from "next/image";
const Carousel = ({ images }) => {
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

  const [touchPosition, setTouchPosition] = useState(null); // New state for tracking touch position
  // Function to handle the start of a touch
  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  // Function to handle the end of a touch
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
    <section aria-label="Newest Photos" className="sm:hidden h-fit ">
      <div
        className=" relative aspect-square w-full  overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="relative flex h-full w-full items-center justify-center  aspect-square">
          {images && images.length > 1 ? (
            images?.map((src, idx) => {
              return (
                <div>
                  <Image
                    src={src}
                    alt="NA"
                    key={idx}
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
        </div>
      </div>
    </section>
  );
};

export default Carousel;
