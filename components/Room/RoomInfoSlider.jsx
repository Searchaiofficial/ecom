"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const RoomInfoSlider = ({ data }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const params = {
      slidesPerView: 4.08,
      centeredSlides: false,
      spaceBetween: 5,
      noSwiping: true,
      allowSlidePrev: true,
      allowSlideNext: true,
      noSwiping: false,
      navigation: {
        nextEl: ".right",
        prevEl: ".back",
      },
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
      breakpoints: {
        300: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
      },
    };

    if (swiperRef.current) {
      Object.assign(swiperRef.current, params);

      swiperRef.current.initialize?.();
    }
  }, [swiperRef, swiperRef.current]);

  return (
    <swiper-container
      init="false"
      ref={swiperRef}
      style={{
        "--swiper-navigation-size": "24px",
        maxHeight: "120px",
        width: "100%",
        marginTop: "16px",
      }}
    >
      {data.map((item, idx) => (
        <swiper-slide
          key={idx}
          style={{
            maxWidth: "130px",
            paddingInline: "4px",
          }}
        >
          <Link
            className="flex flex-col items-center"
            href={`/${item.productTitle.replace(/ /g, "-")}/${item.productId}`}
          >
            <div className="mb-[12px] ">
              <Image
                loading="lazy"
                src={item.images[0]}
                width={200}
                height={130}
                className="h-[70px] object-cover"
              />
            </div>
            <div className="flex justify-between">
              <h2 className="text-[#333333] text-[14px] hover:underline line-clamp-1">
                {item.productTitle}
              </h2>
              <Image
                src="/icons/top_arrow-black.svg"
                alt="arrow"
                width={15}
                height={15}
                loading="lazy"
              />
            </div>
          </Link>
        </swiper-slide>
      ))}
    </swiper-container>
  );
};

export default RoomInfoSlider;
