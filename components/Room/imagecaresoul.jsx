"use client";

import { register } from "swiper/element/bundle";
import React, { useEffect, useRef } from "react";
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

  const swiperRef = useRef(null);

  useEffect(() => {
    register();

    const params = {
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 12,
      navigation: {
        nextEl: ".custom-next-button",
        prevEl: ".custom-prev-button",
      },
      allowSlidePrev: true,
      allowSlideNext: true,
      draggable: true,
      mousewheel: {
        forceToAxis: true,
        invert: false,
      },
      freeMode: {
        enabled: false,
        sticky: true,
        momentum: true,
        momentumRatio: 0.5,
        momentumBounceRatio: 0.5,
      },
    };

    Object.assign(swiperRef.current, params);

    swiperRef.current.initialize();
  }, [images]);

  return (
    <section aria-label="Newest Photos" className="sm:hidden h-fit">
      <div className="relative aspect-square w-full overflow-hidden">
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
          <swiper-container
            init="false"
            ref={swiperRef}
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            {images && images.length > 1 ? (
              images?.map((src, idx) => {
                return (
                  <swiper-slide key={idx}>
                    <Image
                      src={src}
                      alt="NA"
                      height={400}
                      width={400}
                      className="aspect-square"
                    />
                  </swiper-slide>
                );
              })
            ) : (
              <div className="h-full w-full aspect-square flex items-center justify-center">
                Loading...
              </div>
            )}
          </swiper-container>
          <span className="flex absolute bottom-[16px]">
            {/* {images?.map((_, idx) => {
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
            })} */}
          </span>

          <div className="z-50 custom-prev-button">
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

          <div className="z-50 custom-next-button">
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
