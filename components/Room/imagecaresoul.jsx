import React, { useState } from "react";
import "./imagecaresoul.css";
import Image from "next/image";

import {
  selectImages,
  selectProductImages,
} from "../Features/Slices/imageDataSlice";
import { useSelector } from "react-redux";
import Link from "next/link";
const Carousel = ({ images: prodImage }) => {
  const productImages = useSelector(selectProductImages);
  // const prodImage = useSelector(selectImages);

  const images = productImages.length > 0 ? productImages[0].images : prodImage;

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
        <Link
          href={"/login"}
          className="absolute z-10 top-2 right-2 opacity-85 hover:opacity-100 bg-white p-[6px] hover:scale-105 transition-transform rounded-full"
          style={{ boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.12)" }}
        >
          <Image
            loading="lazy"
            src={"/icons/like.svg"}
            height={20}
            width={20}
            className="cursor-pointer"
            alt="like icon"
          />
        </Link>
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
              loading="lazy"
              src="/icons/backarrow-w.svg"
              height={20}
              width={20}
              alt="arrow"
              className="absolute left-3 h-8 w-8 top-1/2 hover:opacity-100"
              // className="absolute filter drop-shadow-sm w-7 h-7  text-white opacity-85 group hover:cursor-pointer hover:opacity-100 hover:scale-104 hover:filter-drop-shadow-lg  arrow-left"
            />
          </div>

          <div className="z-50" onClick={goToNextSlide}>
            <Image
              loading="lazy"
              src="/icons/rightarrow-w.svg"
              height={30}
              width={30}
              alt="arrow"
              className="absolute right-3 top-1/2 h-8 w-8 hover:opacity-100"
              // className="absolute filter drop-shadow-sm w-7 h-7 -mt-[13px] text-white opacity-85 group hover:cursor-pointer hover:opacity-100 hover:scale-104 hover:filter-drop-shadow-lg arrow-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
