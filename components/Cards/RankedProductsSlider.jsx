"use client";

import { useEffect, useRef } from "react";
import Card from "@/components/Rank/Card";

const RankedProductsSlider = ({ data, colors }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const params = {
      slidesPerView: 3.08,
      centeredSlides: false,
      spaceBetween: 5,
      navigation: {
        nextEl: ".custom-next-button",
        prevEl: ".custom-prev-button",
      },
      breakpoints: {
        300: {
          slidesPerView: 1.2,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
      },
      scrollbar: {
        hide: false,
        draggable: true,
      },
      mousewheel: {
        forceToAxis: true,
        invert: false,
      },
      freeMode: {
        enabled: true,
        sticky: true,
        momentum: true,
        momentumRatio: 0.5,
        momentumBounceRatio: 0.5,
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
      style={{ paddingRight: "10px", paddingBottom: "10px" }}
    >
      {data &&
        data.map((item, index) => (
          <swiper-slide key={index}>
            <Card
              category={item.category}
              products={item.products}
              colors={colors[index % 2]}
            />
          </swiper-slide>
        ))}
    </swiper-container>
  );
};

export default RankedProductsSlider;
