"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const OfferSlider = ({
  setSelectedOfferCategory,
  subCategory,
  offerCategoryData,
}) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const params = {
      slidesPerView: 4.08,
      centeredSlides: false,
      spaceBetween: 10,
      draggable: true,
      noSwiping: true,
      allowSlidePrev: true,
      allowSlideNext: true,
      mousewheel: {
        forceToAxis: true,
        invert: false,
      },
      breakpoints: {
        300: {
          slidesPerView: Math.min(subCategory?.length, 2.5),
          spaceBetween: 10,
        },
        768: {
          slidesPerView: Math.min(subCategory?.length, 3),
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: Math.min(subCategory?.length, 7),
          spaceBetween: 10,
        },
      },
      scrollbar: {
        hide: true,
        draggable: true,
      },
      mousewheel: {
        forceToAxis: true,
        invert: false,
      },
      freeMode: {
        enabled: false,
        sticky: true,
      },
    };

    if (swiperRef.current) {
      Object.assign(swiperRef.current, params);

      swiperRef.current.initialize?.();
    }
  }, [swiperRef, swiperRef.current]);

  return (
    <swiper-container
      ref={swiperRef}
      style={{
        "--swiper-navigation-size": "24px",
        maxHeight: "120px",
        width: "100%",
      }}
    >
      {offerCategoryData.map((category, idx) => (
        <swiper-slide
          style={{
            maxWidth: "130px",
          }}
          key={idx}
        >
          <div
            className="cursor-pointer"
            onClick={() => setSelectedOfferCategory(category.name)}
          >
            <div className="flex flex-col ">
              <div className="lg:mb-[12px] ">
                <Image
                  src={category.image}
                  width={200}
                  height={130}
                  alt={category.name}
                  className="w-[200px] h-[70px]"
                />
              </div>
              <h2 className="text-[#333333] text-center text-[14px] hover:underline line-clamp-1">
                {category.name}
              </h2>
            </div>
          </div>
        </swiper-slide>
      ))}
    </swiper-container>
  );
};

export default OfferSlider;
